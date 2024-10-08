import { useRef, useEffect, useState } from "react";
import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";
import { useAuth, useThemes } from "../../context/Context";
import Heading from "../utils/Heading";
import Loader from "../custom/Loader";

export default function OrganizationalChart() {
  const [chartData, setChartData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { getUsers, getCurrentUser } = useAuth();
  const { bgColor } = useThemes();

  const d3Container: any = useRef(null);
  let chart: any = null;

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
      jobTitle: root.jobTitle !== undefined ? root.jobTitle : "",
      department: root.department,
      location: root.location,
    };

    const reporteesToRoot: any = getReportees(root.email, root.id);

    setChartData([rootUser, ...reporteesToRoot]);
  };

  const handleNodeClick = (node: any) => {
    console.log("node", node);
  };

  const formatUsers = (users: any) => {
    const formatedUser = users.map((x: any) => ({
      id: x.id,
      name: x.name.fullName ?? "",
      email: x.primaryEmail ?? "",
      image: x.thumbnailPhotoUrl ?? "",
      jobTitle: x.organizations !== undefined ? x.organizations[0].title : "",
      department:
        x.organizations !== undefined ? x.organizations[0].department : "",
      location: x.locations !== undefined ? x.locations[0].floorName : "",
      manager:
        x.isAdmin === false
          ? x.relations !== undefined
            ? x.relations[0].value
            : ""
          : "",
      phone: x.phones !== undefined ? x.phones[0].value : "",
      isAdmin: x.isAdmin,
    }));
    return formatedUser;
  };

  useEffect(() => {
    setLoading(true);
    getUsers().then(async (users: any) => {
      const formatedUser = formatUsers(users);
      const cu = await getCurrentUser();
      console.log("formatedUser", { formatedUser, cu });
      getChartData(formatedUser, cu);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!chart) {
      chart = new OrgChart();
    }

    chart
      .container(d3Container.current)
      .data(chartData)
      .expandAll()
      .childrenMargin(() => 60)
      .nodeWidth(() => 200)
      .nodeHeight(() => 115)
      .onNodeClick((d: any) => handleNodeClick(d))
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
            border-radius:100px;
            width:50px;
            // height:60px;
            object-fit:cover;
          `,
          wrapper: `
            background-color:none;
            margin-left:1px;
            height:${d.height}px;
            border-radius:2px;
            overflow:visible; 
          `,
          container: `
            height:${d.height}px;
            padding-top:0px;
            background-color:#f4f4f4;
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
            padding:30px; 
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
            text-overflow: ${"unset"}
            color:#333;
            margin-top:4px;
          `,
          department: `
            font-size:${"12"}px;
            color:#404040;
            margin-top:4px;
            text-overflow: ${"unset"}
          `,
          location: `
            font-size: ${"12"}px;
            color:#404040;
            margin-top:4px;
            text-overflow: ${"unset"}
          `,
        };

        const initial = name[0];

        //---------- Styles for org chart end--------

        // ----------------Org Chart Card------------

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
                <div style="${orgChartStyles.location}">${location}</div>
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
      {/* <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        Organizational Chart
      </h1> */}
      <Heading>Organizational Chart</Heading>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div
          style={{
            position: "relative",
            // scale: "0.8",
            display: "flex",
            justifyContent: "center",
          }}
          ref={d3Container}
          id={"D3orgchart"}
        />
      )}
    </div>
  );
}
