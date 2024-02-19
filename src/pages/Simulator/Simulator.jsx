import Nav from "../../components/Nav/Nav";
import Editor from "@monaco-editor/react";

const Simulator = () => {
    return (
        <>
            <Nav />
            <div className="flex justify-center my-8">
                <h1 className="text-5xl text-slate-500">Тренажер</h1>
            </div>
            <div className="flex justify-center">
                <Editor
                    height="70vh"
                    width={'50%'}
                    theme="vs-dark"
                    defaultLanguage="java"
                    defaultValue='import java.util.Random;'
                />
            </div>
        </>
    )
}

export default Simulator;