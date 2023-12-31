import { Dialog } from "@headlessui/react";

type TProps = {
  readonly open: boolean;
  readonly title: string;
  readonly description?: React.ReactNode;
  readonly onClose: () => void;
  readonly button?: React.ReactNode;
};
export const BaseDialog = ({
  open,
  title,
  description,
  onClose,
  button,
}: TProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="fixed inset-0 z-30 h-screen w-screen bg-black/50"
    >
      <Dialog.Panel className="fixed bottom-0 left-1/2 w-screen translate-x-[-50%] rounded-t-2xl bg-lightBeige px-10 py-6 text-center text-themeGray">
        <Dialog.Title className="pb-5 font-bold">{title}</Dialog.Title>
        <Dialog.Description className="mb-7 text-xs" as="div">
          {description}
        </Dialog.Description>
        {button}
      </Dialog.Panel>
    </Dialog>
  );
};
