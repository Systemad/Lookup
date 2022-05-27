import { styled } from '@mui/system';
import Box from "@mui/material/Box";

export const MainFeed = styled('div')({
    height: 100,
    width: 100,
    backgroundColor: "darkcyan"
});

export const TweetBox = styled('div')({
    height: 100,
    width: 100,
    backgroundColor: "darkcyan"
});


export const MainGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '71px 240px auto 240px',
    //gap: 1,
    gridTemplateRows: '46px auto 52px',
    gridTemplateAreas:`
                  "PN PI PI"
                  "NB MF UL"
                  "UI MF UL"`,
    height: '100%'
});

export const Lookups = styled(Box)({
    padding: '20px 0',

    display: 'flex',
    flexDirection: 'column',

    maxHeight: 'calc(100vh - 46px - 68px)',
    overflowY: 'scroll'
});