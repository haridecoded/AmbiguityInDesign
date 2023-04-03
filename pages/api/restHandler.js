import initMiro from "../../initMiro";

export default async function handler(req, res) {
  const { miro, userId } = initMiro(req, res);
  const api = miro.as("");
  const board = await api.getBoard("uXjVMZyMpg0=");
  const item = await board.createCardItem({
    data: { title: "sample card item" },
    position: { origin: "center", x: 0, y: 0 },
  });
  console.log(item);

  res.status(200).json({ message: "I am working!" });
}
