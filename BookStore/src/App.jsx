import React, { useState, useEffect } from 'react';

function App() {
  // 初始书籍数据
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'JavaScript高级程序设计',
      price: 99.00,
      category: '编程',
      description: '一本全面介绍JavaScript语言的权威书籍'
    },
    {
      id: 2,
      title: 'React实战',
      price: 89.00,
      category: '编程',
      description: 'React框架的实战指南'
    },
    {
      id: 3,
      title: '深入理解计算机系统',
      price: 129.00,
      category: '计算机科学',
      description: '计算机系统的全面介绍'
    }
  ]);

  // 弹窗状态
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // 表单数据
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    description: ''
  });

  // 当前编辑的书籍ID
  const [currentBookId, setCurrentBookId] = useState(null);

  // 选中的书籍ID数组
  const [selectedBooks, setSelectedBooks] = useState([]);

  // 排序方式
  const [sortBy, setSortBy] = useState('id');

  // 分类选项
  const categories = ['编程', '计算机科学', '文学', '历史', '艺术', '其他'];

  // 处理输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  // 打开添加书籍弹窗
  const openAddModal = () => {
    setFormData({
      title: '',
      price: '',
      category: '',
      description: ''
    });
    setShowAddModal(true);
  };

  // 打开编辑书籍弹窗
  const openEditModal = (book) => {
    setFormData(book);
    setCurrentBookId(book.id);
    setShowEditModal(true);
  };

  // 关闭弹窗
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentBookId(null);
  };

  // 添加书籍
  const addBook = () => {
    if (!formData.title || !formData.price || !formData.category) return;
    
    const newBook = {
      id: Date.now(),
      ...formData
    };
    
    setBooks(prev => [...prev, newBook]);
    closeModals();
  };

  // 更新书籍
  const updateBook = () => {
    if (!formData.title || !formData.price || !formData.category) return;
    
    setBooks(prev => prev.map(book => 
      book.id === currentBookId ? { ...formData, id: currentBookId } : book
    ));
    closeModals();
  };

  // 删除书籍
  const deleteBook = (id) => {
    setBooks(prev => prev.filter(book => book.id !== id));
    setSelectedBooks(prev => prev.filter(bookId => bookId !== id));
    closeModals();
  };

  // 处理复选框选择
  const handleCheckboxChange = (id) => {
    setSelectedBooks(prev => {
      if (prev.includes(id)) {
        return prev.filter(bookId => bookId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 全选/取消全选
  const handleSelectAll = () => {
    if (selectedBooks.length === books.length) {
      setSelectedBooks([]);
    } else {
      setSelectedBooks(books.map(book => book.id));
    }
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedBooks.length === 0) return;
    setBooks(prev => prev.filter(book => !selectedBooks.includes(book.id)));
    setSelectedBooks([]);
  };

  // 排序书籍
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // 排序后的书籍
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'price':
        return a.price - b.price;
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="container">
      {/* 头部 */}
      <div className="header">
        <h1>图书管理系统</h1>
        <div className="header-actions">
          <div className="sort-section">
            <label>排序方式: </label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value="id">默认</option>
              <option value="title">按书名</option>
              <option value="price">按价格</option>
              <option value="category">按分类</option>
            </select>
          </div>
          {selectedBooks.length > 0 && (
            <button className="delete-btn" onClick={handleBatchDelete}>
              批量删除 ({selectedBooks.length})
            </button>
          )}
          <button className="add-btn" onClick={openAddModal}>添加书籍</button>
        </div>
      </div>

      {/* 全选复选框 */}
      {books.length > 0 && (
        <div className="select-all-section">
          <input 
            type="checkbox" 
            checked={selectedBooks.length === books.length && books.length > 0} 
            onChange={handleSelectAll}
          />
          <label>全选</label>
        </div>
      )}

      {/* 书籍列表 */}
      <div className="books-grid">
        {sortedBooks.map(book => (
          <div key={book.id} className="book-card" onClick={() => openEditModal(book)}>
            <div className="book-checkbox">
              <input 
                type="checkbox" 
                checked={selectedBooks.includes(book.id)} 
                onChange={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(book.id);
                }}
              />
            </div>
            <h2>{book.title}</h2>
            <p>价格: ¥{book.price.toFixed(2)}</p>
            <p>分类: {book.category}</p>
            <div className="card-actions">
              <button className="edit-btn" onClick={(e) => {
                e.stopPropagation();
                openEditModal(book);
              }}>编辑</button>
              <button className="delete-btn" onClick={(e) => {
                e.stopPropagation();
                deleteBook(book.id);
              }}>删除</button>
            </div>
          </div>
        ))}
      </div>

      {/* 添加书籍弹窗 */}
      {showAddModal && (
        <div className="modal" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>添加书籍</h2>
            <div className="form-group">
              <label>书名</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>价格</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>分类</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
              >
                <option value="">请选择分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>描述</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModals}>取消</button>
              <button className="save-btn" onClick={addBook}>保存</button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑书籍弹窗 */}
      {showEditModal && (
        <div className="modal" onClick={closeModals}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>编辑书籍</h2>
            <div className="form-group">
              <label>书名</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>价格</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>分类</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>描述</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="modal-actions">
              <button className="delete-btn" onClick={() => deleteBook(currentBookId)}>删除</button>
              <button className="cancel-btn" onClick={closeModals}>取消</button>
              <button className="save-btn" onClick={updateBook}>保存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;