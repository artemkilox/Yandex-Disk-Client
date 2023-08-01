import YandexDiskUpload from "./components/YandexDiskUpload";
import {BrowserRouter} from "react-router-dom";
import {useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import './styles/appStyles.css'

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
          <Container
            className="container"
          >
              <div
                  className="app-wrapper"
              >
                  <div
                    className="title"
                  >
                      Загрузка файлов на Яндекс.Диск
                  </div>
                  <YandexDiskUpload
                      show={show}
                      onHide={() => setShow(false)}
                  />
                  <Button
                      className="yandex-btn"
                      onClick={() => setShow(true)}
                  >
                      Загрузить файлы на Яндекс.Диск
                  </Button>
                  <div
                    className="files-title"
                  >
                      Файлы на диске:
                  </div>
                  <div
                      className="files-list"
                  >
                      {filesOnDisk ?
                          filesOnDisk.map(file =>
                              <Row
                                  className="file-item"
                                  key={file.resource_id}
                              >
                                  <Col>
                                      {file.name}
                                  </Col>
                                  <Col>
                                      <a
                                          className="link"
                                          href={file.file}
                                      >
                                          Скачать
                                      </a>
                                  </Col>
                              </Row>
                          ) : <div></div>
                      }
                  </div>
              </div>
          </Container>
      </BrowserRouter>
  );
}

export default App;
