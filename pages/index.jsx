import { useEffect, useState } from "react";
import initMiro from "../initMiro";
import Image from "next/image";

import congratulations from "../public/congratulations.png";

export const getServerSideProps = async function getServerSideProps({ req }) {
  const { miro } = initMiro(req);

  // redirect to auth url if user has not authorized the app
  if (!(await miro.isAuthorized(""))) {
    return {
      redirect: {
        destination: miro.getAuthUrl(),
        permanent: false,
      },
    };
  }

  const api = miro.as("");

  const boards = [];

  for await (const board of api.getAllBoards()) {
    boards.push(board.name || "");
  }

  return {
    props: {
      boards,
    },
  };
};

export default function Main({ boards }) {
  async function getItems() {
    const selection = await miro.board.getSelection();
    let notesData = "";
    console.log(selection);
    selection.forEach((element, index) => {
      let note = stripHTML(element.content);
      console.log(note);
      notesData += "Note " + (index + 1) + ": " + note + "<br />";
    });
    setNotesData(notesData);
    let openAIResponse = await fetch("/api/openAI", {
      method: "POST",
      body: "Summarize: " + notesData,
    });
    let openAIResponseData = await openAIResponse.json();
    console.log(openAIResponseData);
    setOpenAIResponse(openAIResponseData.data);
  }

  async function clickHandler() {
    const response = await fetch("/api/restHandler");
    const data = await response.json();
    console.log(data);
    // return response.json();
  }

  function stripHTML(myString) {
    return myString.replace(/(<([^>]+)>)/gi, "");
  }

  // Setting States
  const [notesData, setNotesData] = useState("");
  const [openAIResponse, setOpenAIResponse] = useState("");

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("panel")) return;

    window.miro.board.ui.on("icon:click", async () => {
      window.miro.board.ui.openPanel({
        url: `/?panel=1`,
      });
    });
  }, []);

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        {/* <span class="label label-info">Notes</span>
        <p>{notesData}</p>
        <hr /> */}
        <span class="label label-info">Summary</span>
        <p>{openAIResponse}</p>
        {/* <p>This is a list of all the boards that your user has access to:</p>

        <ul>
          {boards.map((board, idx) => (
            <li key={idx}>{board}</li>
          ))}
        </ul> */}
      </div>
      <div className="cs1 ce12">
        <button onClick={getItems} class="button button-primary">
          Summarize Notes
        </button>
        <button onClick={clickHandler} class="button button-primary">
          Create Card
        </button>
      </div>
    </div>
  );
}
