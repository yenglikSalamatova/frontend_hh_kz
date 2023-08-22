import MyResume from "./myResume";

export default function MyResumes({ resumes }) {
  const showResumes = resumes.map((item) => <MyResume item={item} />);
  return <div>{showResumes}</div>;
}
