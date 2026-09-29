import { PROFILE } from "../data";

export default function CVApp() {
  return (
    <iframe
      src={`${PROFILE.cv}#view=FitH`}
      title={`${PROFILE.name} CV`}
      className="h-full w-full border-0 bg-white"
    />
  );
}
