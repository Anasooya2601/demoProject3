import React, { useState, Fragment, useEffect } from "react";
import Form from "./form";
import Table from "./table";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// import "./App.css";
// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyATUbiI6f1EZVKWGy_1WFJZTKdofbm7pmE",
  authDomain: "demo1-d8658.firebaseapp.com",
  projectId: "demo1-d8658",
  storageBucket: "demo1-d8658.appspot.com",
  messagingSenderId: "1022029493366",
  appId: "1:1022029493366:web:0c19876a20da366d8c9b57",
  measurementId: "G-8LTXYE9MNB"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const tableDataRef = db.collection("tableData");
function Main() {
  const [tableData, setTableData] = useState([]);
  const [formObject, setFormObject] = useState({
    pageno: "",
    date: "",
    Title: "",
    pdf: "",
    search: "",
    time: "",
    Abstract: ""
  });

  useEffect(() => {
    const unsubscribe = tableDataRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setTableData(data);
    });
    return () => unsubscribe();
  }, []);
  const onSearchChange = (event) => {
    const value = event.target.value;
    setFormObject((prev) => ({ ...prev, search: value }));
  };
  const onValChange = (event) => {
    const value = (res) => ({
      ...res,
      [event.target.name]: event.target.value
    });
    setFormObject(value);
  };
  const onFormSubmit = async (event) => {
    event.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      // Upload the PDF file to Firebase Storage
      if (formObject.pdfFile) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(formObject.pdfFile.name);
        await fileRef.put(formObject.pdfFile);
        const pdfUrl = await fileRef.getDownloadURL();
        formObject.pdf = pdfUrl;
      }

      // Save the form data in Firestore
      const docRef = await tableDataRef.add(formObject);

      // Update the Firestore document with the PDF URL
      if (formObject.pdf) {
        await docRef.update({ pdf: formObject.pdf });
      }

      // Get the updated data from Firestore
      const snapshot = await tableDataRef.get();
      const data = snapshot.docs.map((doc) => doc.data());
      setTableData(data);

      // Reset the form
      const isEmpty = {
        pageno: "",
        date: "",
        Title: "",
        Abstract: "",
        pdf: "",
        time: ""
      };
      setFormObject(isEmpty);
    }
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const downloadUrl = await fileRef.getDownloadURL();
    setFormObject((prev) => ({ ...prev, pdf: downloadUrl }));
  };

  const onDeleteRow = async (rowIndex) => {
    const newData = [...tableData];
    const docId = newData[rowIndex].id;

    // Delete the PDF file from Firebase Storage
    const pdfUrl = newData[rowIndex].pdf;
    if (pdfUrl) {
      const storageRef = firebase.storage().refFromURL(pdfUrl);
      await storageRef.delete();
    }

    // Delete the document from Firestore
    try {
      await tableDataRef.doc(docId).delete();
    } catch (error) {
      console.error("Error deleting document: ", error);
      return;
    }

    // Update the state
    newData.splice(rowIndex, 1);
    setTableData(newData);
  };

  const filteredData = tableData.filter((item) => {
    const searchValue = formObject.search
      ? formObject.search.toLowerCase()
      : "";
    const abstract = item.Abstract ? item.Abstract.toLowerCase() : "";
    return abstract.includes(searchValue);
  });

  // const filteredData = tableData.filter((item) => {
  //   const searchValue = formObject.search
  //     ? formObject.search.toLowerCase()
  //     : "";
  //   const title = item.Title ? item.Title.toLowerCase() : "";
  //   const date = item.date ? item.date.toLowerCase() : "";
  //   const pageno = item.pageno ? item.pageno.toLowerCase() : "";
  //   const abstract = item.Abstract ? item.Abstract.toLowerCase() : "";
  //   return (
  //     title.includes(searchValue) ||
  //     date.includes(searchValue) ||
  //     pageno.includes(searchValue) ||
  //     abstract.includes(searchValue)
  //   );
  // });

  return (
    <Fragment>
      <Form
        onFileChange={onFileChange}
        onValChange={onValChange}
        formObject={formObject}
        onFormSubmit={onFormSubmit}
        onSearchChange={onSearchChange}
      />

      <Table tableData={filteredData} onDeleteRow={onDeleteRow} />
    </Fragment>
  );
}
export default Main;
