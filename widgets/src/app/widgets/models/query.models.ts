///
/// Copyright © 2016-2020 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { AlarmInfo, AlarmSearchStatus, AlarmSeverity, DataKey, DataKeyType, EntityId } from '@shared/public-api';
import { SortDirection } from '@angular/material/sort';

export enum EntityKeyType {
  ATTRIBUTE = 'ATTRIBUTE',
  CLIENT_ATTRIBUTE = 'CLIENT_ATTRIBUTE',
  SHARED_ATTRIBUTE = 'SHARED_ATTRIBUTE',
  SERVER_ATTRIBUTE = 'SERVER_ATTRIBUTE',
  TIME_SERIES = 'TIME_SERIES',
  ENTITY_FIELD = 'ENTITY_FIELD',
  ALARM_FIELD = 'ALARM_FIELD'
}

export function dataKeyTypeToEntityKeyType(dataKeyType: DataKeyType): EntityKeyType {
  switch (dataKeyType) {
    case DataKeyType.timeseries:
      return EntityKeyType.TIME_SERIES;
    case DataKeyType.attribute:
      return EntityKeyType.ATTRIBUTE;
    case DataKeyType.function:
      return EntityKeyType.ENTITY_FIELD;
    case DataKeyType.alarm:
      return EntityKeyType.ALARM_FIELD;
    case DataKeyType.entityField:
      return EntityKeyType.ENTITY_FIELD;
  }
}

export interface EntityKey {
  type: EntityKeyType;
  key: string;
}

export function dataKeyToEntityKey(dataKey: DataKey): EntityKey {
  const entityKey: EntityKey = {
    key: dataKey.name,
    type: dataKeyTypeToEntityKeyType(dataKey.type)
  };
  return entityKey;
}

export enum EntityKeyValueType {
  STRING = 'STRING',
  NUMERIC = 'NUMERIC',
  BOOLEAN = 'BOOLEAN',
  DATE_TIME = 'DATE_TIME'
}

export enum FilterPredicateType {
  STRING = 'STRING',
  NUMERIC = 'NUMERIC',
  BOOLEAN = 'BOOLEAN',
  COMPLEX = 'COMPLEX'
}

export enum StringOperation {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS'
}

export const stringOperationTranslationMap = new Map<StringOperation, string>(
  [
    [StringOperation.EQUAL, 'filter.operation.equal'],
    [StringOperation.NOT_EQUAL, 'filter.operation.not-equal'],
    [StringOperation.STARTS_WITH, 'filter.operation.starts-with'],
    [StringOperation.ENDS_WITH, 'filter.operation.ends-with'],
    [StringOperation.CONTAINS, 'filter.operation.contains'],
    [StringOperation.NOT_CONTAINS, 'filter.operation.not-contains']
  ]
);

export enum NumericOperation {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  GREATER = 'GREATER',
  LESS = 'LESS',
  GREATER_OR_EQUAL = 'GREATER_OR_EQUAL',
  LESS_OR_EQUAL = 'LESS_OR_EQUAL'
}

export const numericOperationTranslationMap = new Map<NumericOperation, string>(
  [
    [NumericOperation.EQUAL, 'filter.operation.equal'],
    [NumericOperation.NOT_EQUAL, 'filter.operation.not-equal'],
    [NumericOperation.GREATER, 'filter.operation.greater'],
    [NumericOperation.LESS, 'filter.operation.less'],
    [NumericOperation.GREATER_OR_EQUAL, 'filter.operation.greater-or-equal'],
    [NumericOperation.LESS_OR_EQUAL, 'filter.operation.less-or-equal']
  ]
);

export enum BooleanOperation {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL'
}

export enum ComplexOperation {
  AND = 'AND',
  OR = 'OR'
}

export enum DynamicValueSourceType {
  CURRENT_TENANT = 'CURRENT_TENANT',
  CURRENT_CUSTOMER = 'CURRENT_CUSTOMER',
  CURRENT_USER = 'CURRENT_USER'
}

export const dynamicValueSourceTypeTranslationMap = new Map<DynamicValueSourceType, string>(
  [
    [DynamicValueSourceType.CURRENT_TENANT, 'filter.current-tenant'],
    [DynamicValueSourceType.CURRENT_CUSTOMER, 'filter.current-customer'],
    [DynamicValueSourceType.CURRENT_USER, 'filter.current-user']
  ]
);

export interface DynamicValue<T> {
  sourceType: DynamicValueSourceType;
  sourceAttribute: string;
}

export interface FilterPredicateValue<T> {
  defaultValue: T;
  userValue?: T;
  dynamicValue?: DynamicValue<T>;
}

export interface StringFilterPredicate {
  type: FilterPredicateType.STRING,
  operation: StringOperation;
  value: FilterPredicateValue<string>;
  ignoreCase: boolean;
}

export interface NumericFilterPredicate {
  type: FilterPredicateType.NUMERIC,
  operation: NumericOperation;
  value: FilterPredicateValue<number>;
}

export interface BooleanFilterPredicate {
  type: FilterPredicateType.BOOLEAN,
  operation: BooleanOperation;
  value: FilterPredicateValue<boolean>;
}

export interface BaseComplexFilterPredicate<T extends KeyFilterPredicate | KeyFilterPredicateInfo> {
  type: FilterPredicateType.COMPLEX,
  operation: ComplexOperation;
  predicates: Array<T>;
}

export type ComplexFilterPredicate = BaseComplexFilterPredicate<KeyFilterPredicate>;

export type ComplexFilterPredicateInfo = BaseComplexFilterPredicate<KeyFilterPredicateInfo>;

export type KeyFilterPredicate = StringFilterPredicate |
  NumericFilterPredicate |
  BooleanFilterPredicate |
  ComplexFilterPredicate |
  ComplexFilterPredicateInfo;

export interface KeyFilterPredicateUserInfo {
  editable: boolean;
  label: string;
  autogeneratedLabel: boolean;
  order?: number;
}

export interface KeyFilterPredicateInfo {
  keyFilterPredicate: KeyFilterPredicate;
  userInfo: KeyFilterPredicateUserInfo;
}

export interface KeyFilter {
  key: EntityKey;
  valueType: EntityKeyValueType;
  predicate: KeyFilterPredicate;
}

export interface KeyFilterInfo {
  key: EntityKey;
  valueType: EntityKeyValueType;
  predicates: Array<KeyFilterPredicateInfo>;
}

export interface FilterInfo {
  filter: string;
  editable: boolean;
  keyFilters: Array<KeyFilterInfo>;
}

export interface Filter extends FilterInfo {
  id: string;
}

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface EntityDataSortOrder {
  key: EntityKey;
  direction: Direction;
}

export interface EntityDataPageLink {
  pageSize: number;
  page: number;
  textSearch?: string;
  sortOrder?: EntityDataSortOrder;
  dynamic?: boolean;
}

export interface AlarmDataPageLink extends EntityDataPageLink {
  startTs?: number;
  endTs?: number;
  timeWindow?: number;
  typeList?: Array<string>;
  statusList?: Array<AlarmSearchStatus>;
  severityList?: Array<AlarmSeverity>;
  searchPropagatedAlarms?: boolean;
}

export function entityDataPageLinkSortDirection(pageLink: EntityDataPageLink): SortDirection {
  if (pageLink.sortOrder) {
    return (pageLink.sortOrder.direction + '').toLowerCase() as SortDirection;
  } else {
    return '' as SortDirection;
  }
}

export interface TsValue {
  ts: number;
  value: string;
}

export interface EntityData {
  entityId: EntityId;
  latest: {[entityKeyType: string]: {[key: string]: TsValue}};
  timeseries: {[key: string]: Array<TsValue>};
}

export interface AlarmData extends AlarmInfo {
  entityId: string;
  latest: {[entityKeyType: string]: {[key: string]: TsValue}};
}
