import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { updateLayouts, resetLayout } from './store/layoutSlice';

import { SalesLineChart } from "./components/salesLineChart.tsx";
import { SalesBarChart } from "./components/salesBarChart.tsx";
import { CategoryPieChart } from "./components/categoryPieChart.tsx";
import { UsersTable, ProductsTable } from "./components/usersTable.tsx";
import { DragHandle } from "./components/ResizableWrapper.jsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

// Main App Component
export default function App() {
  const dispatch = useDispatch();
  const { layouts, breakpoints, cols } = useSelector((state) => state.layout);

  // Load saved layout from localStorage on component mount
  useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    if (savedLayouts) {
      try {
        const parsedLayouts = JSON.parse(savedLayouts);
        dispatch(updateLayouts(parsedLayouts));
      } catch (error) {
        console.error('Error loading saved layouts:', error);
      }
    }
  }, [dispatch]);

  // Save layout changes to localStorage and Redux
  const handleLayoutChange = (layout, layouts) => {
    dispatch(updateLayouts(layouts));
    localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
  };

  const handleResetLayout = () => {
    dispatch(resetLayout());
    localStorage.removeItem('dashboardLayouts');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Sample Dashboard with resize & reposition</h1>
          <button
            onClick={handleResetLayout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Reset Layout
          </button>
        </div>
      
        <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={60}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        resizeHandles={['se']}
        useCSSTransforms={true}
      >
        <div key="lineChart" className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <DragHandle title="Monthly Performance" />
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <SalesLineChart />
          </div>
        </div>

        <div key="pieChart" className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <DragHandle title="Category Distribution" />
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <CategoryPieChart />
          </div>
        </div>

        <div key="barChart" className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <DragHandle title="Quarterly Sales Comparison" />
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <SalesBarChart />
          </div>
        </div>

        <div key="usersTable" className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <DragHandle title="Users Table" />
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <UsersTable />
          </div>
        </div>

        <div key="productsTable" className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <DragHandle title="Products Table" />
          <div className="flex-1 p-4" style={{ height: 'calc(100% - 60px)' }}>
            <ProductsTable />
          </div>
        </div>
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}