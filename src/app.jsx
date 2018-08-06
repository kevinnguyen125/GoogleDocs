import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    console.count('RENDER-APP');
    return (<div>
      <Button color="primary" variant="raised" onMouseDown={e => this.onBoldClick(e)}>BOLD</Button>
      <div>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={8}>
            <Paper
              elevation={1}
              style={{ padding: 10, height: 400 }}
              onClick={() => this.domEditor.focus()}
            >
              <Editor
                className="editor"
                editorState={this.state.editorState}
                onChange={this.onChange}
                ref={this.setDomEditorRef}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>

    </div>);
  }
}
