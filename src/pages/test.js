// import dynamic from 'next/dynamic';
import EmailTest from 'src/components/email/EmailTest';

// const Editor = dynamic(() => import('src/components/blocknote/BlockNoteEd'), { ssr: false });

const test = () => {
  console.log('test');
  return (
    <>
      {/* <Editor /> */}
      <EmailTest name="Louise" email="Louise@this.com" link="mailto:hello@sjbtherapy.com" />;
    </>
  );
};
export default test;
