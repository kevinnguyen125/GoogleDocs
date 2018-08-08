const styles = {
  mainEditor: {
    padding: 20,
    height: 800,
    overflow: 'auto',
    border: 'grey solid 4px',
  },

  mainEditorSelected: {
    padding: 20,
    height: 800,
    overflow: 'auto',
    border: '3px solid #87CEFA',
    WebkitTransition: 'all 0.30s ease-in-out',
    MozTransition: 'all 0.30s ease-in-out',
    MsTransition: 'all 0.30s ease-in-out',
    OTransition: 'all 0.30s ease-in-out',
    outline: 'none',
  },

  formatButton: {
    // border: 'grey solid 2px',
    minWidth: 0,
    minHeight: 0,
    width: '1em',
    height: '3em',
  },

  horizFlex0: {
    flex: 0,
    padding: '0.1em',
    height: '100%',
  },

  formControl: {
    margin: '0.2em',
    minWidth: 10,
  },
};

export default styles;
