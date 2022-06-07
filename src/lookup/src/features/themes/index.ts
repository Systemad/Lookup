import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
      global: {
          '*':{
              margin: '0',
              padding: '0',
              boxSizing: 'border-box',
          },
          'html, body, #root': {
              height: '100%',
              backgroundColor: '#36393f',
          },
          '*, button, input': {
              border: '0',
              outline: '0',
              fontFamily: 'Roboto, sans-serif'
        }
      }
    }
});

export default theme;