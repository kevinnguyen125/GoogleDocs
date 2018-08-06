import React from 'react';
import Button from '@material-ui/core/Button';
import { Editor, EditorState, RichUtils } from 'draft-js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.onChange = editorState => this.setState({ editorState });
  }

  onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  render() {
    return (<div>
      <Button color="primary" variant="raised" onMouseDown={e => this.onBoldClick(e)}>BOLD</Button>
      <Editor editorState={this.state.editorState} onChange={this.onChange} />
    </div>);
  }
}
