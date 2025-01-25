import React from 'react';
import { useParameter } from '@storybook/api';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Content = () => {
  const code = useParameter('code', 'No Code Available');

  return (
    <SyntaxHighlighter language="jsx" style={atomOneDark} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default Content;
