import "./App.css";
import React, { Component } from "react";
import "./App.scss";
import { marked } from "marked";
import { Prism } from "prismjs";
import "./prism.css";

marked.setOptions({
  breaks: true,
  sanitize: true,
  smartLists: true,
  smartypants: true,
  tables: true,
   
});

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: DEFAULT,
      maxmize: false,
      minimize: false,
      mode: false,
      split: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  extend = () => {
    this.setState({
      maxmize: !this.state.maxmize,
    });
  };

  compress = () => {
    this.setState({
      minimize: !this.state.minimize,
    });
  };

  darkMode = () => {
    this.setState({ mode: !this.state.mode });
  };
  split = () => {
    this.setState({ split: !this.state.split });
  };

  render() {
    const METHODS = {
      wide: this.state.maxmize
        ? [
            "editor fullscreen",
            "Previewer visibility",
            "fas fa-compress",
            "Compress",
          ]
        : this.state.minimize
        ? [
            "editor visibility",
            "Previewer fullscreen",
            "fas fa-compress",
            "Compress",
          ]
        : ["editor", "Previewer", "fas fa-expand", "Expend"],
      darkMode: this.state.mode
        ? ["fas fa-moon set", "container-fluid dark", "Dark Mode On"]
        : ["fas fa-sun set", "container-fluid light", "Dark Mode Off"],
      split:
        this.state.split && !this.state.maxmize && !this.state.minimize
          ? ["fas fa-swatchbook set", "Rows", "Splited into Rows"]
          : ["fas fa-columns set", "Columns", "Splited into Column"],
    };

    let allFun = [METHODS.darkMode[1], METHODS.split[1]];

    return (
      <div className={allFun.join(" ")}>
        <div className={METHODS.wide[0]}>
          <Header
            buttonClick={this.buttonClick}
            splitVar={METHODS.split}
            split={this.split}
            modeVar={METHODS.darkMode}
            mode={this.darkMode}
            icon={METHODS.wide}
            nameIcon="fas fa-pencil-alt"
            size={this.extend}
            text="Editor"
          />
          <Editor onChange={this.handleChange} data={this.state.input} />
        </div>

        <div className={METHODS.wide[1]}>
          <Header
            splitVar={METHODS.split}
            split={this.split}
            modeVar={METHODS.darkMode}
            mode={this.darkMode}
            size={this.compress}
            icon={METHODS.wide}
            nameIcon="fas fa-eye"
            text="Previewer"
          />
          <Previewer read={this.state.input} />
        </div>
        <span className="DEV">By Prince</span>
      </div>
    );
  }
}

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: false,
    };
  }

  moreFun = () => {
    this.setState({ option: !this.state.option });
  };

  render() {
    let option = this.state.option
      ? ["functions", "arrow-right fas fa-chevron-right"]
      : ["visibility", "arrow-left fas fa-chevron-left"];
    return (
      <div className="header">
        <i className={this.props.nameIcon}></i> {this.props.text}
        <div className="slider">
          <i onClick={this.moreFun} className={option[1]}></i>

          <div className={option[0]}>
            <i
              className={this.props.modeVar[0]}
              title={this.props.modeVar[2]}
              onClick={this.props.mode}
            ></i>
            <i
              className={this.props.splitVar[0]}
              title={this.props.splitVar[2]}
              onClick={this.props.split}
            ></i>
            <a
              href="https://www.markdownguide.org/cheat-sheet/"
              title="How to use ?"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fas fa-chalkboard-teacher"></i>
            </a>
          </div>
        </div>
        <i
          style={{
            position: "absolute",
            left: "99%",
            top: "9px",
            marginLeft: "-18px",
          }}
          className={this.props.icon[2]}
          onClick={this.props.size}
          title={this.props.icon[3]}
        ></i>
      </div>
    );
  }
}

// Editor box  ////>>>>>

export class Editor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <textarea
        name="Markdown"
        id="text"
        onChange={this.props.onChange}
        value={this.props.data}
        style={{ padding: "10px" }}
      ></textarea>
    );
  }
}

// Markdown previewer  ////>>>>>

export class Previewer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: marked(this.props.read, { renderer: this.renderer }),
        }}
        id="Markdown"
        className="textBar"
      />
    );
  }
}

const DEFAULT = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`









export default App;
