import React from 'react';
import { Button, Grid, Paper, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import MenuIcon from '@material-ui/icons/Menu';
import styles from './styles';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = {
      editorState: EditorState.createEmpty(),
      styling: styles.mainEditor,
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

  onItalicsClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {
    console.count('RENDER-APP');
    return (<div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Button
        color="primary"
        variant="raised"
        onMouseDown={e => this.onBoldClick(e)}
      >
        BOLD</Button>
      <Button
        color="primary"
        variant="raised"
        onMouseDown={e => this.onItalicsClick(e)}
      >
        ITALICS</Button>

      <div>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={8}>
            <Paper
              elevation={5}
              style={this.state.styling}
              onClick={() => this.domEditor.focus()}
              onFocus={() => this.setState({ styling: this.styles.mainEditorSelected })}
              onBlur={() => this.setState({ styling: this.styles.mainEditor })}
            >
              <Editor
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
