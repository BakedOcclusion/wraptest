import MintStatus from "./MintStatus";

export default function MintList(props) {
  const tokens = props.tokens;
  const listItems = tokens.map((token) => (
    <li key={token.toString()}>
      <MintStatus token={token} />
    </li>
  ));
  return <ul className="mint-list">{listItems}</ul>;
}
