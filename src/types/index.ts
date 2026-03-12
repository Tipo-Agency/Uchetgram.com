/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum EntityType {
  TASK = 'TASK',
  MESSAGE = 'MESSAGE',
  FINANCE_REQUEST = 'FINANCE_REQUEST',
  DOCUMENT = 'DOCUMENT',
  LEAD = 'LEAD',
  PROCESS = 'PROCESS',
  TRANSACTION = 'TRANSACTION',
  FINANCE_PLAN = 'FINANCE_PLAN',
  FOLDER = 'FOLDER'
}

export enum EntityPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED'
}

export interface SubTask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task extends UniversalEntity {
  dueDate?: string;
  tags: string[];
  subtasks: SubTask[];
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
}

export interface UniversalEntity {
  id: string;
  type: EntityType;
  title: string;
  description?: string;
  status: string;
  priority: EntityPriority;
  creatorId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
  metadata: Record<string, any>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  description: string;
  source: 'BANK' | 'MANUAL' | '1C';
  isReconciled: boolean;
  linkedEntityId?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  type: 'FIXED' | 'PERCENTAGE';
  value: number; // Amount for fixed, 0-100 for percentage
  parentId?: string;
}

export interface FundAllocationRequest extends UniversalEntity {
  amount: number;
  categoryId: string;
  requesterId: string;
  approvedAmount?: number;
  paymentDate?: string;
}

export interface FinancePlan {
  id: string;
  period: string; // e.g., "2024-03"
  plannedIncome: number;
  plannedExpenses: number;
  categories: {
    categoryId: string;
    plannedAmount: number;
    actualAmount: number;
  }[];
}

export enum DocType {
  FOLDER = 'FOLDER',
  FILE = 'FILE',
  LINK = 'LINK',
  INTERNAL = 'INTERNAL'
}

export interface AppDocument extends UniversalEntity {
  docType: DocType;
  parentId?: string;
  fileUrl?: string;
  fileSize?: number;
  mimeType?: string;
  externalUrl?: string;
  content?: string; // For internal text docs
  tags?: string[];
}

export enum ProcessStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum StepType {
  TASK = 'TASK',
  DECISION = 'DECISION',
  AUTOMATION = 'AUTOMATION',
  END = 'END'
}

export interface ProcessStep {
  id: string;
  title: string;
  description?: string;
  type: StepType;
  assigneeId?: string;
  nextStepId?: string; // For linear flow
  branches?: { [key: string]: string }; // For decision points: { "Approved": "step_id_3", "Rejected": "step_id_4" }
}

export interface ProcessInstance extends UniversalEntity {
  templateId: string;
  currentStepId: string;
  steps: ProcessStep[];
  history: {
    stepId: string;
    completedAt: string;
    completedBy: string;
    result?: string;
  }[];
}

export interface AnalyticsMetric {
  label: string;
  value: number | string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface AppSettings {
  companyName: string;
  timezone: string;
  currency: string;
  language: 'ru' | 'en';
  integrations: {
    id: string;
    name: string;
    status: 'CONNECTED' | 'DISCONNECTED';
    lastSync?: string;
  }[];
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: 'industry' | 'integration' | 'automation';
  price: 'free' | 'paid';
  rating: number;
  installs: number;
  icon: string;
  banner: string;
}

export type ModuleId =
  | 'dashboard'
  | 'sales'
  | 'finance'
  | 'documents'
  | 'tasks'
  | 'processes'
  | 'analytics'
  | 'marketplace'
  | 'settings';
