import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const YandexDiskUpload = ({show, onHide}) => {
    const [files, setFiles] = useState([])

    const uploadFiles = () => {
        files.map(async file => {
                let fileFormat = file.file.type.split('/')[1]
                let answer = new Promise(function(resolve,reject){
                fetch('https://cloud-api.yandex.net/v1/disk/resources/upload?path=app:/'+ file.name + '.' + fileFormat, {
                    headers: {
                        'Authorization': 'OAuth y0_AgAAAAAhJA1SAApFDgAAAADpIrtscLwwRUU2Sp-eWYC0geRQ3gMeppI'
                    }
                }).then(
                        response => {
                            response.json().then(result => {
                                fetch(result.href , {
                                    method: "PUT",
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: file.file
                                })
                            })

                        }
                    )
                }).then(onHide())
            }
        )
    }

    const addFiles = () => {
        setFiles([...files, {name: '', file: '', number: Date.now()}])
    }
    const removeFiles = (number) => {
        setFiles(files.filter(i => i.number !== number))
    }
    const changeFiles = (key, value, number) => {
        setFiles(files.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    return (
        <Modal
            className="modal-window"
            show={show}
            onHide={onHide}
            centered
        >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Загрузить файлы
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {files.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col
                                md={4}
                                className="col-1"
                            >
                                <Form.Control
                                    value={i.name}
                                    onChange={(e) => changeFiles('name', e.target.value, i.number)}
                                    placeholder="Название файла"
                                />
                            </Col>
                            <Col md={4}
                                 className="col-2"
                            >
                                <Form.Control
                                    type="file"
                                    onChange={(e) => changeFiles('file', e.target.files[0], i.number)}
                                />
                            </Col>
                            <Col md={4}
                                 className="col-3"
                            >
                                <Button
                                    onClick={() => removeFiles(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                    <Button
                        variant={"outline-dark"}
                        className="add-btn"
                        onClick={addFiles}
                    >
                        Добавить
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                    <Button variant="outline-success" onClick={uploadFiles}>Сохранить</Button>
                </Modal.Footer>
        </Modal>
    );
};

export default YandexDiskUpload;