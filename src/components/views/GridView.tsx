import Card from "../cards/Card";

const GridView = ({ users }: any) => {
  return (
    <div className="flex flex-wrap gap-5">
      {users.map((x: any, i: any) => {

        const manager = users.find((y:any)=>y.email ===x.manager)

        return <Card user={x} manager={manager} key={i} />
      })}
    </div>
  );
};

export default GridView;
