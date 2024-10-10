import { useEffect, useState } from "react";
import {
  Dropdown,
  Toggle,
  Stack,
  DetailsList,
  IColumn,
  IconButton,
  SelectionMode,
} from "@fluentui/react";
import { useAuth } from "../../context/Context";
import Button from "../custom/buttons/Button";
import ToggleButton from "../custom/ToggleButton";
import PageIconButton from "../custom/icons/PageIconButton";

const ListStyles = {
  contentWrapper: {
    ".ms-DetailsRow-fields": {
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      fontSize: "14px",
    },
  },
};

const SearchFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<
    Array<{ key: string; active: boolean; value: string }>
  >([]);
  const [properties, setProperties] = useState([
    { key: "name", text: "Name" },
    { key: "email", text: "Email" },
    { key: "jobTitle", text: "Job Title" },
    { key: "department", text: "Department" },
    { key: "location", text: "Location" },
  ]);

  const { searchFilters, setSearchFilter } = useAuth();

  const handleAddFilter = () => {
    if (selectedFilter) {
      const newFilter = {
        key: selectedFilter,
        active: true,
        value: selectedFilter,
      };
      setFilters((prev) => [...prev, newFilter]);
      setSearchFilter((prev: any) => [...prev, newFilter]);
      setSelectedFilter(null);

      setProperties((prev) =>
        prev.filter((item) => item.key !== selectedFilter)
      );
    }
  };

  const handleToggleChange = (key: string) => {
    setFilters((prev) =>
      prev.map((filter) =>
        filter.key === key ? { ...filter, active: !filter.active } : filter
      )
    );
    setSearchFilter((prev: any) =>
      prev.map((filter: any) =>
        filter.key === key ? { ...filter, active: !filter.active } : filter
      )
    );
  };

  const handleDeleteFilter = (key: string) => {
    setFilters((prev) => prev.filter((filter) => filter.key !== key));
    setSearchFilter((prev: any) =>
      prev.filter((filter: any) => filter.key !== key)
    );

    const deletedFilter = filters.find((filter) => filter.key === key);
    if (deletedFilter) {
      setProperties((prev) => [
        ...prev,
        { key: deletedFilter.key, text: deletedFilter.value },
      ]);
    }
  };

  useEffect(() => {
    setFilters(searchFilters);
    function filterNotPresent(arrA: any, arrB: any) {
      const keysInB = new Set(arrB.map((item: any) => item.key));
      return arrA.filter((item: any) => !keysInB.has(item.key));
    }
    setProperties(filterNotPresent(properties, searchFilters));
  }, [searchFilters]);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Filter",
      fieldName: "key",
      minWidth: 200,
      isMultiline: true,
    },
    {
      key: "column3",
      name: "Active",
      fieldName: "active",
      minWidth: 100,
      onRender: (item) => (
        <ToggleButton
          checked={item.active}
          onChange={() => handleToggleChange(item.key)}
        />
      ),
    },
    {
      key: "column4",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      onRender: (item) => (
        <PageIconButton
          iconProps={{ iconName: "Delete" }}
          title="Delete Filter"
          ariaLabel="Delete Filter"
          onClick={() => handleDeleteFilter(item.key)}
        />
      ),
    },
  ];

  return (
    <Stack tokens={{ childrenGap: 15 }} styles={{ root: { padding: 20 } }}>
      <Stack>
        <div className="flex justify-between items-end gap-5 mt-5">
          <div className="w-[80%]">
            <Dropdown
              placeholder={
                properties.length < 1
                  ? "All filters are selected"
                  : "Select a property to filter"
              }
              label="Available Properties"
              options={properties}
              onChange={(_, option: any) => {
                if (option) {
                  setSelectedFilter(option.key);
                }
              }}
              selectedKey={selectedFilter}
            />
          </div>
          <div>
            <Button
              className="whitespace-nowrap"
              onClick={handleAddFilter}
              disabled={!selectedFilter}
              text="Create Filter"
            />
          </div>
        </div>

        <DetailsList
          items={filters}
          columns={columns}
          setKey="set"
          compact={true}
          selectionMode={SelectionMode.none}
          styles={ListStyles}
        />
      </Stack>
    </Stack>
  );
};

export default SearchFilters;
