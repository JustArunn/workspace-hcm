import { useRef, useEffect, useState, useMemo } from "react";
import { useAuth, useThemes } from "../../context/Context";
import { formatAllUsers } from "../utils/utils";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import Heading from "../utils/Heading";
import Loader from "../custom/Loader";
import EmployeeInfo from "../modals/EmployeeInfo";

export default function OrganizationalChart() {
  const [chartData, setChartData] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const [manager, setManager] = useState<any>(null);
  const [isOpen, onDismiss] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getUsers, getCurrentUser, allUsers } = useAuth();
  const { bgColor } = useThemes();

  const d3Container: any = useRef(null);
  const chart = useMemo(() => new OrgChart(), [chartData]);

  const getChartData = (users: any, rootEmail: string) => {
    if (rootEmail === "") return;

    const root = users.find((x: any) => x.email === rootEmail);

    const getReportees = (managerEmail: string, parentId: string) => {
      const reportees = users.filter((x: any) => x.manager === managerEmail);
      return reportees.flatMap((x: any) => [
        {
          id: x.id,
          parentId: parentId,
          image: x.image,
          name: x.name,
          email: x.email,
          jobTitle: x.jobTitle,
          department: x.department,
          location: x.location,
        },
        ...getReportees(x.email, x.id),
      ]);
    };

    const rootUser: any = {
      id: root.id,
      parentId: "",
      image: root.image,
      name: root.name,
      email: root.email,
      jobTitle: root.jobTitle !== undefined ? root.jobTitle : "",
      department: root.department,
      location: root.location,
    };

    const reporteesToRoot: any = getReportees(root.email, root.id);

    setChartData([rootUser, ...reporteesToRoot]);
  };

  const handleNodeClick = (node: any) => {
    const u: any = allUsers.find((x: any) => x.email === node.data.email);
    const m: any = allUsers.find((x: any) => x.email === u.manager);
    setUser(u);
    setManager(m);
    onDismiss(true);
  };

  useEffect(() => {
    setLoading(true);
    getUsers().then(async (users: any) => {
      const formatedUser = formatAllUsers(users);
      const cu = await getCurrentUser();
      getChartData(formatedUser, cu);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    chart
      .container(d3Container.current)
      .data(chartData)
      .expandAll()
      .childrenMargin(() => 60)
      .nodeWidth(() => 200)
      .nodeHeight(() => 115)
      .onNodeClick((n: any) => handleNodeClick(n))
      .buttonContent(({ node }: any) => {
        const buttonStyles = `
          color:#FFF;
          padding:3px 6px;
          font-size:10px;
          margin:auto auto;
          background-color: ${bgColor};
        `;

        return `<div style="${buttonStyles}"> 
                  ${node.data._directSubordinates}  
                </div>`;
      })
      .linkUpdate(function (this: SVGElement, d: any) {
        d3.select(this)
          .attr("stroke", (d: any) =>
            d.data._upToTheRootHighlighted ? bgColor : bgColor
          )
          .attr("stroke-width", (d: any) =>
            d.data._upToTheRootHighlighted ? 15 : 1
          );

        if (d.data._upToTheRootHighlighted) {
          d3.select(this).raise();
        }
      })
      .nodeContent((d: any) => {
        const { image, name, jobTitle, department, location } = d.data;

        const orgChartStyles = {
          imgCon: `
            display: flex;
            margin-left: -10px;
            margin-right: -10px;
            justify-content: center;
          `,
          img: `
            margin-top:-18px;
            border-radius:100%;
            width:50px;
            object-fit:cover;
          `,
          wrapper: `
            margin-left:1px;
            height:${d.height}px;
            border-radius:2px;
            overflow:visible;
          `,
          container: `
            height:${d.height}px;
            padding-top:0px;
            border:1px solid ${bgColor};
          `,
          textWrapper: `
            margin-top:-34px;
            background-color: ${bgColor};
            height:10px;
            width:${d.width - 2}px;
            border-radius:1px
          `,
          textContainer: `
            padding-top:35px;
            text-align:center;
            padding-bottom:10px;
            margin-left-5px;
          `,
          name: `
            color:#333;
            font-size:${"14"}px;
          `,
          jobTitle: `
            font-size:${"12"}px;
            color:#333;
            margin-top:4px;
          `,
          department: `
            font-size:${"12"}px;
            color:#404040;
            margin-top:4px;
          `,
          location: `
            font-size: ${"12"}px;
            color:#404040;
            margin-top:4px;
          `,
        };

        const initial = name[0];
        const fullAddress = `${location.buildingId} ${location.floorName} ${location.floorSection}`;

        return `
        <div style="${orgChartStyles.wrapper}">
          <div style="${orgChartStyles.container}">
            <div style="${orgChartStyles.imgCon}">
              <img
                src="${image}";
                onerror="this.src='${`https://api.dicebear.com/9.x/initials/svg?backgroundColor=${bgColor.replace(
                  "#",
                  ""
                )}&seed=${initial}`}'"
                alt="IMAGE"
                style="${orgChartStyles.img}"
              />
            </div>
            <div style="${orgChartStyles.textWrapper}">
              <div style="${orgChartStyles.textContainer}">
                <div style="${orgChartStyles.name}">${name}</div>
                <div style="${orgChartStyles.jobTitle}">${jobTitle}</div>
                <div style="${orgChartStyles.department}">${department}</div>
                <div style="${orgChartStyles.location}">${fullAddress}</div>
              </div>
            </div>
          </div>
        </div>`;
      })
      .render();

    return () => {
      if (d3Container.current) {
        d3Container.current.innerHTML = "";
      }
    };
  }, [chartData]);

  return (
    <div className="h-screen w-full p-6">
      <Heading>Organizational Chart</Heading>
      <EmployeeInfo
        isOpen={isOpen}
        onDismiss={() => onDismiss(false)}
        employee={user}
        manager={manager}
      />
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div
          ref={d3Container}
          id={"D3orgchart"}
        />
      )}
    </div>
  );
}
