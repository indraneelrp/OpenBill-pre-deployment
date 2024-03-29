import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import "./SubmitOpenB.css";
import { useCrud } from "../hooks/useCRUD";
import { useAuthContext } from "../hooks/useAuthContext";
import QuillEditor from "../components/QuillEditor";
import "react-quill/dist/quill.snow.css";

function SubmitOpenB() {
  const [billCategory, setBillCategory] = useState("Environment");
  const [billTitle, setBillTitle] = useState("");
  const [relatedLaws, setRelatedLaws] = useState("");
  const [currentProbs, setCurrentProbs] = useState("");
  const [summary, setSummary] = useState("");
  const [elabHow, setElabHow] = useState("");
  const [elabWhy, setElabWhy] = useState("");
  const [bibliography, setBibliography] = useState("");
  
  const { addDoc, state } = useCrud("OpenBills");
  const { user } = useAuthContext(); // importing user to get access to uid field on the user object

  const submitHandler = (event) => {
    event.preventDefault();
    // getting the Owner id
    const id = user.uid;
    const disp = user.displayName;

    if(billTitle === "" || relatedLaws === "" || currentProbs === "" || summary=== "" || elabHow === ""){
      alert("Required fields: Title, related laws, current problem, summary, elaboration section 1");
      return;
    }

    // destructured addDoc hence can be directly used
    // by passing in the doc argument expected
    addDoc({
      Category: billCategory,
      Title: billTitle,
      RelatedLaws: relatedLaws,
      CurrentProblems: currentProbs,
      Summary: summary,
      Elaboration1: elabHow,
      Elaboration2: elabWhy,
      Bibliography: bibliography,
      ProposalType: "OpenBill",
      OwnerID: id,
      DisplayName: disp
    });
  };

  // refreshing form once submitted
  useEffect(() => {
    if (state.success) {
      setBillTitle("");
      setRelatedLaws("");
      setCurrentProbs("");
      setSummary("");
      setElabHow("");
      setElabWhy("");
      setBibliography("");
      setBillCategory("Environment");
      //alert("Submitted!");
      window.location.reload(false);
    }
  }, [state.success]); // will only fire when success property changes

  // useEffect(() => {
  //   console.log(elabHow)
  // }, [elabHow])

  if(state.isPending === false){
    return (
      <div className="bg-slate-100 font-main">
        <PageTitle title="Create an OpenBill" />
        <form>
          <div className="submitQuestionContainer">
            <section className="categorySelect">
              <h4>Choose a Category:</h4>
              <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                  {!state.isPending && (
                    <select
                      className="categoryMenu"
                      value={billCategory}
                      onChange={(event) => {
                        setBillCategory(event.target.value);
                      }}
                      aria-label="Select Category"
                    >
                      <option value="Environment">Environment</option>
                      <option value="Education">Education</option>
                      <option value="Economic">Economic</option>
                      <option value="Social Welfare">Social Welfare</option>
                      <option value="Gender">Gender</option>
                      <option value="Privacy/Security">Privacy/Security</option>
                      <option value="Health">Health</option>
                      <option value="Housing">Housing</option>
                      <option value="Transport">Transport</option>
                    </select>
                  )}
  
                  {state.isPending && <select disabled></select>}
                </div>
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Title</h3>
                <h5>Write a brief title</h5>
                {!state.isPending && (
                  <textarea
                    className="questionTitleInput"
                    maxLength="200"
                    placeholder=""
                    value={billTitle}
                    onChange={(event) => {
                      setBillTitle(event.target.value);
                    }}
                    required
                  ></textarea>
                )}
  
                {state.isPending && (
                  <textarea className="questionTitleInput" disabled></textarea>
                )}
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Related laws</h3>
                <h5>Which acts/policies/laws are likely to be affected?</h5>
                  <QuillEditor
                    sendUp={setRelatedLaws}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Current Problems</h3>
                <h5>What’s wrong? How are current policies insufficient/ ineffective?</h5>
                  <QuillEditor
                    sendUp={setCurrentProbs}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Summary of Recommendations</h3>
                <h5>First summarise your recommendations, ideally in less than 50 words per point :)</h5>
                  <QuillEditor
                    sendUp={setSummary}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Elaboration: Part 1</h3>
                <h5>Now provide details on how these recommendations would be implemented</h5>
                  <QuillEditor
                    sendUp={setElabHow}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Elaboration: Part 2</h3>
                <h5>Why do these measures work? If you have theoretical explanations/ supporting data, present these arguments here (Optional)</h5>
                  <QuillEditor
                    sendUp={setElabWhy}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <section className="questionSection bg-white">
              <div className="sectionContainer">
                <h3 className="questionHeader">Bibliography</h3>
                <h5>Optional, but highly recommended!</h5>
                  <QuillEditor
                    sendUp={setBibliography}
                    className="editor-style"
                    readMode={false}
                  />
              </div>
            </section>
  
            <div className="center">
              <p>See a past bill or report considered in Parliament</p>
                <a href="https://sso.agc.gov.sg/Act/CPA2018?ProvIds=P18-#pr45-" className="underline m-2">
                  Bill  
                </a>
                <a href="https://sso.agc.gov.sg/Act/CPA2018?ProvIds=P18-#pr45-" className="underline m-2">
                  Report  
                </a>
            </div>
  
            <button
              type="submit"
              onClick={submitHandler}
              className="m-2 pl-8 p-1 pr-8 bg-indigo-500 text-white rounded-lg"
            >
              Publish OpenBill
            </button>
  
          </div>
        </form>
        
      </div>
    );
  }
  else{
    return (
      <h4 className="center m-9">Publishing...</h4>
    )
  }
  
}
export default SubmitOpenB;