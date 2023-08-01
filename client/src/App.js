import YandexDiskUpload from "./components/YandexDiskUpload";
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";
import {Button} from "react-bootstrap";
import {useEffect} from "react";

function App() {

    const [filesOnDisk, setFilesOnDisk] = useState([])

    useEffect( ()=> {
        fetch('https://cloud-api.yandex.net/v1/disk/resources?path=app:/', {
            headers: {
                'Authorization': 'OAuth y0_AgAAAAAhJA1SAApFDgAAAADpIrtscLwwRUU2Sp-eWYC0geRQ3gMeppI'
            }
        }).then(
            response => {
                response.json().then(result => {
                    setFilesOnDisk(result._embedded.items)
                })

            }
        )
    })

    const [show, setShow] = useState(false)

  return (
      <BrowserRouter>
          <Button
            onClick={() => setShow(true)}
          >
              Загрузить файлы на Яндекс.Диск
          </Button>
          <YandexDiskUpload
              show={show}
              onHide={() => setShow(false)}
          />
          {filesOnDisk ?
            filesOnDisk.map(file =>
                <div
                    key={file.resource_id}
                >{file.name}</div>
            ) : <div></div>
          }
      </BrowserRouter>
  );
}

export default App;
