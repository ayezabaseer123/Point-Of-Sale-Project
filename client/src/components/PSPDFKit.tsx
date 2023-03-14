import React, { Component } from "react";

declare global {
    interface Window { // ⚠️ notice that "Window" is capitalized here
        PSPDFKit:any
    }
  }

  interface MyProps {
blob:any
  }
  

export default class PSPDFKit extends Component <MyProps>{
  containerRef:any = React.createRef();

  componentDidMount() {
    const blob:any=this.props.blob;
    const url:any = URL.createObjectURL(blob);
   window.PSPDFKit.load({
      document: url,
      container: this.containerRef.current
    });
  }

  componentWillUnmount() {
    window.PSPDFKit.unload(this.containerRef.current);
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
    );
  }
}
