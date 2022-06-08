import { extendTheme } from '@chakra-ui/react';

/*
  css={{
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: scrollbarColor,
      borderRadius: '24px',
    },
  }}
 */
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
        },
          '&::-webkit-scrollbar': {
              width: '4px'
          },
          '&::-webkit-scrollbar-track': {
              backgroundColor: 'var(--secondary)'
          },
          '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--tertiary)',
              borderRadius: '4px',
          },

      }
    }
});

export default theme;