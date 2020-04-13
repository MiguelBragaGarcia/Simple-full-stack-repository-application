import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    if (!(title === "" || owner === "")) {
      const response = await api.post("projects", {
        title: title,
        owner: owner,
      });

      const project = response.data;
      setProjects([...projects, project]);
    }
  }
  return (
    <>
      <Header title="Projects"></Header>

      <div id="Input">
        <input
          type="text"
          placeholder="Nome do projeto"
          id="projectTitle"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="Nome do autor"
          id="projectTitle"
          onChange={(e) => {
            setOwner(e.target.value);
          }}
        ></input>
        <button type="button" onClick={handleAddProject}>
          Adicionar projeto
        </button>
      </div>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
