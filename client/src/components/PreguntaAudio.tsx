import { IonButton, IonIcon, IonSegment } from "@ionic/react";
import { cameraOutline, keypadOutline, micOutline } from "ionicons/icons";
import React, { useState } from "react";

import { File } from "@ionic-native/file";
import { Media, MediaObject } from "@ionic-native/media";
import { Base64 } from "@ionic-native/base64";

import axios from "axios";

import "./PreguntaAudio.css";

const fs = require("fs");

const PreguntaAudio: React.FC = () => {
  const [status, setStatus] = useState<string>("");

  const [path, setPath] = useState<string>("anterior");

  const [blob, setBlob] = useState<Blob>(new Blob());

  const [activeAudio, setActiveAudio] = useState<boolean>(false);

  const [myState, setMyState] = useState<Object>({ file: null, base64URL: "" });

  const file = File.createFile(
    File.externalRootDirectory,
    "myaudio.mp3",
    true
  ).then((file) => {
    setPath(file.toInternalURL());
  });
  const [mediaObj, setMediaObj] = useState<MediaObject>(
    Media.create(
      File.externalRootDirectory.replace(/^file:\/\//, "") + "myaudio.mp3"
    )
  );

  const recordAudio = async () => {
    if (!activeAudio) {
      setStatus("recording...");
      mediaObj.startRecord();
    } else {
      setStatus("stopped");
      mediaObj.stopRecord();
      mediaObj.release();
      Base64.encodeFile(path)
        .then((base64File: string) => {
          setStatus(base64File);
        })
        .catch((err) => setStatus("FALSO TODO"));
      // // await Base64.encodeFile(path);
    }
    setActiveAudio(!activeAudio);
  };

  //   function submitForm(contentType, data) {
  // 	axios({
  // 		url: 'http://localhost:8000/api/auditoria/respuesta',
  // 		method: 'POST',
  // 		data: data,
  // 		headers: {
  // 			'Content-Type': contentType
  // 		}
  // 	})
  //    }

  //   const sendAudio = () => {
  // 	const toBase64 = file => new Promise((resolve, reject) => {
  // 		const reader = new FileReader();
  // 		reader.readAsDataURL(file);
  // 		reader.onload = () => resolve(reader.result);
  // 		reader.onerror = error => reject(error);
  // 	});

  // 	const data = {
  // 		title: title,
  // 		file: await toBase64(file),
  // 		desc: desc
  // 	}

  // 	submitForm("application/json", data, (msg) => console.log(msg));

  // const reader = new FileReader();
  // reader.onload = () => {
  //   const formData = new FormData();
  //   // formData.append("file", new Blob([reader.result]), file.name);  // Found both online
  //   formData.append(mediaObj, new Blob([reader.result]));  // Tested both with same behavior.
  //   const url = "http://"; // server
  //   axios.post(url, {
  // 	headers: {
  // 	  "Content-Type": `multipart/form-data;`, // boundary=${dat._boundary}`,
  // 	},
  // 	data: formData,
  // 	}
  //   ).then((res) => {
  // 	console.log(res);
  //   });
  // }
  // reader.readAsArrayBuffer(mediaObj);
  // eliminar el audio

  // const config = {
  // 	encoding: LINEAR16,
  // 	sampleRateHertz: 16000,
  // 	languageCode: es-AR,
  // };
  // const audio = {
  // 	content: fs.readFileSync(filename).toString('base64'),
  // };

  // const request = {
  // 	config: config,
  // 	audio: audio,
  // 	// };

  //   };

  const getBase64 = (file: any) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: string | ArrayBuffer | null;
      baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  const handleFileInputChange = (e: any) => {
    // console.log(e.target.files[0]);
    let file = myState.file;

    file = e.target.files[0];

    getBase64(file)
      .then((result) => {
        file["base64"] = result;
        console.log("File Is", file);
        setMyState({
          base64URL: result,
          file,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    setMyState({
      file: e.target.files[0],
    });
  };

  return (
    <IonSegment className="ion-justify-content-between bg-color">
      <div>
        <input type="file" name="file" onChange={handleFileInputChange} />
      </div>
      <IonButton color="light" className="rounded ">
        <IonIcon icon={cameraOutline} />
        {status}
      </IonButton>
      <IonButton
        className="rounded"
        onClick={recordAudio}
        color={activeAudio ? "danger" : ""}
      >
        <IonIcon icon={micOutline} />
      </IonButton>
      <IonButton color="light" className="rounded">
        <IonIcon icon={keypadOutline} />
      </IonButton>
    </IonSegment>
  );
};

export default PreguntaAudio;
