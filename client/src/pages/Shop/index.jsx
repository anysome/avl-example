import React, { Component } from 'react';
import ComplexTabTable from './components/ComplexTabTable';

export default function() {
  return (
    <div className="Shop-page">
      {/* 附带复杂的 Tab 多级筛选项的表格 */}
      <ComplexTabTable />
    </div>
  );
}
