import React from 'react';


class QuestionImage extends React.Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.imgRef.current && prevProps.img.src !== this.props.img.src) {
      this.imgRef.current.classList.add('fade-in');

      let timer = setTimeout(() => {
        this.imgRef.current.classList.remove('fade-in');
        clearTimeout(timer);
      }, 1000)
    }
  }

  render() {
    return (
      <img ref={this.imgRef} className="img-fluid" src={this.props.img.src} alt={this.props.img.alt} />
    );
  }
}

export default QuestionImage;
