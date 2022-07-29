import { ConnectButton } from "web3uikit";

export default function Header() {
  return (
    <div className="p-5 flex flex-row">
      <h1 className="font-bold text-4xl font-serif">Bank</h1>
      <div className="ml-auto px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
