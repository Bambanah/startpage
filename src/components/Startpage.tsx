import React, { useState, useEffect } from "react";
import firebase from "gatsby-plugin-firebase";

import Category from "../components/Category";

import * as styles from "../styles/links.module.scss";
import { Data, Category as CategoryType } from "../utils/types";
import { signOut, getCurrentUserId } from "../utils/auth";

export default function Startpage() {
  let initialData: Data = { categories: {} };
  const [data, setData] = useState(initialData);
  const [editMode, setEdit] = useState(false);

  useEffect(() => {
    const userId = getCurrentUserId();

    firebase
      .database()
      .ref(`/users/${userId}`)
      .once("value")
      .then((snapshot) => {
        setData(snapshot.val());
      });
  }, []);

  return (
    <>
      <div className={styles.link_container}>
        {data &&
          Object.values(data.categories).map((category: CategoryType) => {
            return (
              <Category key={category.color} category={category}></Category>
            );
          })}
      </div>
      <div className={styles.bottomButtons}>
        {!editMode && (
          <a className={styles.editButton} onClick={() => setEdit(true)}>
            Edit
          </a>
        )}
        {editMode && (
          <a
            style={{ border: `1px solid #43d4ee` }}
            className={styles.editButton}
            onClick={() => setEdit(false)}
          >
            Save
          </a>
        )}
        <a className={styles.logoutButton} onClick={signOut}>
          Logout
        </a>
      </div>
    </>
  );
}
