import React, { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import * as styles from "../../../styles/links.module.scss";
import { ButtonRow } from "../../shared/components/Styles";

interface Props {
  updateLink: any;
}

export default function AddLink({ updateLink }: Props) {
  let [addingLink, setAddingLink] = useState(false);

  let [title, setTitle] = useState("");
  let [url, setUrl] = useState("");

  const addLink = (e: FormEvent) => {
    e.preventDefault();

    const uid = uuidv4();
    const newLink = { title: title, url: url };

    updateLink(uid, newLink);
    setAddingLink(false);
    setTitle("");
    setUrl("");
  };

  if (!addingLink) {
    return (
      <li>
        <a
          className={styles.addLinkButton}
          onClick={() => {
            setAddingLink(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </li>
    );
  } else {
    return (
      <li>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={title}
            required={true}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <input
            // TODO: Validate url
            type="text"
            placeholder="Url"
            value={url}
            required={true}
            onChange={(e) => {
              setUrl(e.currentTarget.value);
            }}
          />
          <ButtonRow>
            <button className="saveButton" onClick={addLink}>
              Save
            </button>
            <button
              className="cancelButton"
              onClick={(e) => {
                e.preventDefault();
                setAddingLink(false);
              }}
            >
              Cancel
            </button>
          </ButtonRow>
        </form>
      </li>
    );
  }
}
