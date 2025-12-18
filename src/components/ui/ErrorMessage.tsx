import { TfiGithub } from "react-icons/tfi";
type ErrorMessageProps = {
  error: {
    message: string;
  };
};
const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      <div className="flex items-center align-middle justify-center max-w-80 w-full bg-red-600/20 text-red-600 px-3 h-10 rounded-sm">
        <div className="flex align-middle items-center">
          <TfiGithub />
          <p className="text-sm text-white ml-2">{error?.message}.</p>
        </div>
      </div>
    </>
  );
};

export default ErrorMessage;
