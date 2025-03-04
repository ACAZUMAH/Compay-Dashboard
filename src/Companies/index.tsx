import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { useFetchCompaniesList } from "./hooks/useFetchCompanies";
import { SearchOutlined } from "@ant-design/icons";
import CustomAvatar from "@/components/avatar/avatar";
import { Text } from "@/components";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/helpers";
import { useState } from "react";

export const Companies = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const go = useGo();
  const { tableProps, filters } = useFetchCompaniesList(searchValue);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: { resource: "comapnies", action: "create" },
              options: { keepQuery: true },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
        <Table.Column<Company>
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props} >
              <Input
                placeholder="search Company"
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FilterDropdown>
          )}
          render={(value, record) => (
            <Space>
              <CustomAvatar
                shape="square"
                name={record.name}
                src={record.avatarUrl}
              />
              <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
            </Space>
          )}
        />
        <Table.Column<Company>
          dataIndex="totalRevenue"
          title="Open deals amount"
          render={(value, company) => (
            <Text>
              {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
            </Text>
          )}
        />
        <Table.Column<Company>
          dataIndex="id"
          title="Actions"
          render={(value) => (
            <Space>
              <EditButton hideText size="small" recordItemId={value} />
              <DeleteButton hideText size="small" recordItemId={value} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
