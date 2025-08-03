type SharedComponentProps = {
  working?: boolean;
  settings: { registration: boolean } | null;
  onChange: (data: { registration: boolean }) => void;
};
export const SharedComponent = (props: SharedComponentProps) => {
  return (
    <div className="mx-auto flex flex-col gap-4 bg-white p-4">
      <div
        className={`text-lg font-bold ${props.working ? "text-green-500" : "text-red-500"}`}
      >
        {props.working ? "SHOULD WORKING" : "SHOULD NOT WORKING"}
      </div>
      <pre>
        <code>{JSON.stringify(props.settings, null, 2)}</code>
      </pre>
      <div className="flex gap-2">
        <input
          id="registration"
          type="checkbox"
          checked={props.settings?.registration}
          onChange={(e) =>
            props.onChange({
              registration: e.target.checked,
            })
          }
        />
        <label htmlFor="registration">Registration</label>
      </div>
    </div>
  );
};
