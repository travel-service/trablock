import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import BuildBlockForm from 'containers/Canvas/BuildBlockForm';

const BuildBlockPage = () => {
  return (
    <PageTemplate>
      <BuildBlockForm idx={2} />
    </PageTemplate>
  );
};

export default BuildBlockPage;
