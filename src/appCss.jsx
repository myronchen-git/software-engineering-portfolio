import GlobalStyles from '@mui/material/GlobalStyles';

// ==================================================

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      '#root :is(h3, h4, h5)': {
        marginBottom: '0.75em',
      },
      'main > section': {
        scrollMarginTop: '6em',
      },
      '.flex-center': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    }}
  />
);

// ==================================================

export default inputGlobalStyles;
