import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
} from 'reactstrap';
import Dropzone from 'react-dropzone';

import s from './Fileupload.scss';
import Widget from '../../../components/Widget';

class Fileupload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropFiles: [],
    };

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    this.setState({
      dropFiles: files,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Components - <span className="fw-semi-bold">Fileupload</span>
          <small> Drag & drop fileupload</small>
        </h2>
        <Row>
          <Col lg="6" md={12}>
            <Widget title={<h5><strong>Drop</strong> Zone</h5>} settings close>
              <div>
                <Dropzone
                  onDrop={this.onDrop} accept="image/*"
                  className={`${s.dropzone} dropzone`}
                >
                  {this.state.dropFiles.length > 0 ? <div>
                    {this.state.dropFiles.map((file, idx) => (
                      <div className="display-inline-block mr-xs mb-xs" key={`drop-id-${idx.toString()}`}>
                        <img alt="..." src={file.preview} width={100} />
                        <div>{file.name}</div>
                      </div>
                    ))}
                  </div> : <p>This dropzone accepts only images.
                    Try dropping some here, or click to select files to upload.</p>}
                </Dropzone>

              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Fileupload);
