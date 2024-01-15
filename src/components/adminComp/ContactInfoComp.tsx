// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactInfoComp({ state }: any) {
  return (
    <div className="h-1/4 w-max grid grid-cols-2 mt-10">
      <p className="text-primary">Name</p>
      <p>Keyur</p>
      <p className="text-primary">Email</p>
      <p>
        {state.users.email}
      </p>
      <p className="text-primary">Contact Number</p>
      <p>+447824886546</p>
      <p className="text-primary">Address</p>
      <p>187 Ann Street Plumstead London SE187LY</p>
    </div>
  );
}

export default ContactInfoComp;
