import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBlock,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap';

import Lightbox from 'react-images';

import Widget from '../../../components/Widget';
import s from './Gallery.scss';
import i5 from '../../../images/5.jpg';
import i6 from '../../../images/6.jpg';
import i7 from '../../../images/7.jpg';
import i8 from '../../../images/8.jpg';
import i9 from '../../../images/9.jpg';
import i10 from '../../../images/10.jpg';
import i11 from '../../../images/11.jpg';
import i12 from '../../../images/12.jpg';

class Gallery extends React.Component {

  constructor() {
    super();

    this.state = {
      currentImage: 0,
      lightboxIsOpen: false,
      images: [{ src: i5 }, { src: i9 }, { src: i6 }, { src: i8 }, { src: i7 }],
      theme: {
        arrow: {
          ':focus': {
            outline: 0,
          },
        },
        close: {
          ':focus': {
            outline: 0,
          },
        },
      },
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
  }

  openLightbox(index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoImage(index) {
    this.setState({
      currentImage: index,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  handleClickImage() {
    if (this.state.currentImage === this.state.images.length - 1) return;

    this.gotoNext();
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Media - <span className="fw-semi-bold">Gallery</span>
          <small>&nbsp;Images, videos and more</small>
        </h2>
        <Row>
          <Col md={10}>
            <Widget
              title={<h4><i className="fa fa-star" />
                &nbsp;Grid of images, videos, text, and more
              </h4>}
            >
              <div className={s.galleryWidget}>
                <Row className="thumbnails">
                  <Col sm={6}>
                    <a
                      href="#"
                      onClick={(e) => { this.openLightbox(0, e); }}
                    >
                      <img src={i5} alt="" className="img-thumbnail" />
                    </a>
                  </Col>
                  <Col sm={6}>
                    <Row>
                      <Col sm={8}>
                        <a
                          href="#"
                          onClick={(e) => { this.openLightbox(1, e); }}
                        >
                          <img src={i9} alt="" className="img-thumbnail" />
                        </a>
                      </Col>
                      <Col sm={4}>
                        <a
                          href="#"
                          onClick={(e) => { this.openLightbox(2, e); }}
                        >
                          <img src={i6} alt="" className="img-thumbnail" />
                        </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={8}>
                        <a
                          href="#"
                          onClick={(e) => { this.openLightbox(3, e); }}
                        >
                          <img src={i8} alt="" className="img-thumbnail" />
                        </a>
                      </Col>
                      <Col sm={4}>
                        <a
                          href="#"
                          onClick={(e) => { this.openLightbox(4, e); }}
                        >
                          <img src={i7} alt="" className="img-thumbnail" />
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              <Lightbox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                onClose={this.closeLightbox}
                onClickImage={this.handleClickImage}
                onClickThumbnail={this.gotoImage}
                backdropClosesModal
                enableKeyboardInput
                theme={this.state.theme}
              />
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col md={10}>
            <Row className="thumbnails">
              <Col sm={4}>
                <Card>
                  <CardImg top width="100%" src={i10} alt="" />
                  <CardBlock>
                    <CardTitle>Card label</CardTitle>
                    <CardText>
                      <strong>
                        You will never know exactly how something will go until you try it.
                      </strong>
                      You can think three hundred times and still have no precise result...
                    </CardText>
                    <p>
                      <Button color="danger" className="mr-1">Favorite</Button>
                      <Button color="inverse">Read more...</Button>
                    </p>
                  </CardBlock>
                </Card>
              </Col>
              <Col sm={4}>
                <Card>
                  <CardImg top width="100%" src={i12} alt="" />
                  <CardBlock>
                    <CardTitle>Card label</CardTitle>
                    <CardText>
                      You don’t need to think about HOW it can turn out.
                      All you have to do is to GO and DO IT. It should
                      be super-fast and easy. You don’t need to think about.
                    </CardText>
                    <p>
                      <Button color="danger" className="mr-1">Favorite</Button>
                      <Button color="inverse">Read more...</Button>
                    </p>
                  </CardBlock>
                </Card>
              </Col>
              <Col sm={4}>
                <Card>
                  <CardImg top width="100%" src={i11} alt="" />
                  <CardBlock>
                    <CardTitle>Card label</CardTitle>
                    <CardText>
                      No hesitation. You ask me: “What to do with
                      fearful thoughts preventing me from doing that?”
                      The answer is to ignore them, because they can’t
                    </CardText>
                    <p>
                      <Button color="danger" className="mr-1">Favorite</Button>
                      <Button color="inverse">Read more...</Button>
                    </p>
                  </CardBlock>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Gallery);
