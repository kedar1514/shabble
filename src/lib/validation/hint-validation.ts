export function validateHintParams(searchParams: URLSearchParams, userId: string | null) {
    const errors: string[] = [];
  
    if (!userId) {
      errors.push('User ID is required');
    }
  
    const boardSize = parseInt(searchParams.get('boardSize') || '6');
    if (isNaN(boardSize) || boardSize < 1) {
      errors.push('Invalid board size');
    }
  
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push('Invalid date format. Use YYYY-MM-DD');
    }
  
    const x = parseInt(searchParams.get('x') || '-1');
    const y = parseInt(searchParams.get('y') || '-1');
    
    if (isNaN(x) || isNaN(y) || x >= boardSize || y >= boardSize) {
      errors.push('Invalid coordinates');
    }
    else if(x < 0 || y < 0) {
      errors.push('Missing coordinates');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      data: { boardSize, date, x, y }
    };
  }