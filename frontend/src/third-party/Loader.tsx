import { LoadingOutlined } from "@ant-design/icons";

const Loader: React.FC = () => (
  <div
    className="
      fixed inset-0 
      flex items-center justify-center 
      bg-white/70 
      z-[2000]
    "
  >
    <LoadingOutlined
      className="text-[100px] text-[#180731]"
      spin
    />
  </div>
);

export default Loader;
