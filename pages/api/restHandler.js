import initMiro from "../../initMiro";

export default async function handler(req, res) {
  const { miro, userId } = initMiro(req, res);
  const api = miro.as("");
  api
    .createCardItem(
      {
        data: { title: "sample card item" },
        position: { origin: "center", x: 0, y: 0 },
      },
      { board_id: "uXjVMZyMpg0=" }
    )
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));

  res.status(200).json({ message: "I am working!" });
}
