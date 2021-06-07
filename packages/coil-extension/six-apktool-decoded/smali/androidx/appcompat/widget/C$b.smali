.class Landroidx/appcompat/widget/C$b;
.super Landroidx/appcompat/widget/U;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/appcompat/widget/C;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x2
    name = "b"
.end annotation


# instance fields
.field private K:Ljava/lang/CharSequence;

.field L:Landroid/widget/ListAdapter;

.field private final M:Landroid/graphics/Rect;

.field final synthetic N:Landroidx/appcompat/widget/C;


# direct methods
.method public constructor <init>(Landroidx/appcompat/widget/C;Landroid/content/Context;Landroid/util/AttributeSet;I)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-direct {p0, p2, p3, p4}, Landroidx/appcompat/widget/U;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;I)V

    new-instance p2, Landroid/graphics/Rect;

    invoke-direct {p2}, Landroid/graphics/Rect;-><init>()V

    iput-object p2, p0, Landroidx/appcompat/widget/C$b;->M:Landroid/graphics/Rect;

    invoke-virtual {p0, p1}, Landroidx/appcompat/widget/U;->a(Landroid/view/View;)V

    const/4 p2, 0x1

    invoke-virtual {p0, p2}, Landroidx/appcompat/widget/U;->a(Z)V

    const/4 p2, 0x0

    invoke-virtual {p0, p2}, Landroidx/appcompat/widget/U;->f(I)V

    new-instance p2, Landroidx/appcompat/widget/D;

    invoke-direct {p2, p0, p1}, Landroidx/appcompat/widget/D;-><init>(Landroidx/appcompat/widget/C$b;Landroidx/appcompat/widget/C;)V

    invoke-virtual {p0, p2}, Landroidx/appcompat/widget/U;->a(Landroid/widget/AdapterView$OnItemClickListener;)V

    return-void
.end method

.method static synthetic a(Landroidx/appcompat/widget/C$b;)V
    .locals 0

    invoke-super {p0}, Landroidx/appcompat/widget/U;->c()V

    return-void
.end method


# virtual methods
.method public a(Landroid/widget/ListAdapter;)V
    .locals 0

    invoke-super {p0, p1}, Landroidx/appcompat/widget/U;->a(Landroid/widget/ListAdapter;)V

    iput-object p1, p0, Landroidx/appcompat/widget/C$b;->L:Landroid/widget/ListAdapter;

    return-void
.end method

.method public a(Ljava/lang/CharSequence;)V
    .locals 0

    iput-object p1, p0, Landroidx/appcompat/widget/C$b;->K:Ljava/lang/CharSequence;

    return-void
.end method

.method b(Landroid/view/View;)Z
    .locals 1

    invoke-static {p1}, La/g/i/s;->v(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->M:Landroid/graphics/Rect;

    invoke-virtual {p1, v0}, Landroid/view/View;->getGlobalVisibleRect(Landroid/graphics/Rect;)Z

    move-result p1

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method public c()V
    .locals 3

    invoke-virtual {p0}, Landroidx/appcompat/widget/U;->b()Z

    move-result v0

    invoke-virtual {p0}, Landroidx/appcompat/widget/C$b;->l()V

    const/4 v1, 0x2

    invoke-virtual {p0, v1}, Landroidx/appcompat/widget/U;->e(I)V

    invoke-super {p0}, Landroidx/appcompat/widget/U;->c()V

    invoke-virtual {p0}, Landroidx/appcompat/widget/U;->d()Landroid/widget/ListView;

    move-result-object v1

    const/4 v2, 0x1

    invoke-virtual {v1, v2}, Landroid/widget/ListView;->setChoiceMode(I)V

    iget-object v1, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v1}, Landroid/widget/Spinner;->getSelectedItemPosition()I

    move-result v1

    invoke-virtual {p0, v1}, Landroidx/appcompat/widget/U;->g(I)V

    if-eqz v0, :cond_0

    return-void

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v0}, Landroid/widget/Spinner;->getViewTreeObserver()Landroid/view/ViewTreeObserver;

    move-result-object v0

    if-eqz v0, :cond_1

    new-instance v1, Landroidx/appcompat/widget/E;

    invoke-direct {v1, p0}, Landroidx/appcompat/widget/E;-><init>(Landroidx/appcompat/widget/C$b;)V

    invoke-virtual {v0, v1}, Landroid/view/ViewTreeObserver;->addOnGlobalLayoutListener(Landroid/view/ViewTreeObserver$OnGlobalLayoutListener;)V

    new-instance v0, Landroidx/appcompat/widget/F;

    invoke-direct {v0, p0, v1}, Landroidx/appcompat/widget/F;-><init>(Landroidx/appcompat/widget/C$b;Landroid/view/ViewTreeObserver$OnGlobalLayoutListener;)V

    invoke-virtual {p0, v0}, Landroidx/appcompat/widget/U;->a(Landroid/widget/PopupWindow$OnDismissListener;)V

    :cond_1
    return-void
.end method

.method l()V
    .locals 8

    invoke-virtual {p0}, Landroidx/appcompat/widget/U;->f()Landroid/graphics/drawable/Drawable;

    move-result-object v0

    const/4 v1, 0x0

    if-eqz v0, :cond_1

    iget-object v1, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget-object v1, v1, Landroidx/appcompat/widget/C;->i:Landroid/graphics/Rect;

    invoke-virtual {v0, v1}, Landroid/graphics/drawable/Drawable;->getPadding(Landroid/graphics/Rect;)Z

    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-static {v0}, Landroidx/appcompat/widget/Ha;->a(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget-object v0, v0, Landroidx/appcompat/widget/C;->i:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->right:I

    goto :goto_0

    :cond_0
    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget-object v0, v0, Landroidx/appcompat/widget/C;->i:Landroid/graphics/Rect;

    iget v0, v0, Landroid/graphics/Rect;->left:I

    neg-int v0, v0

    :goto_0
    move v1, v0

    goto :goto_1

    :cond_1
    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget-object v0, v0, Landroidx/appcompat/widget/C;->i:Landroid/graphics/Rect;

    iput v1, v0, Landroid/graphics/Rect;->right:I

    iput v1, v0, Landroid/graphics/Rect;->left:I

    :goto_1
    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v0}, Landroid/widget/Spinner;->getPaddingLeft()I

    move-result v0

    iget-object v2, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v2}, Landroid/widget/Spinner;->getPaddingRight()I

    move-result v2

    iget-object v3, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v3}, Landroid/widget/Spinner;->getWidth()I

    move-result v3

    iget-object v4, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget v5, v4, Landroidx/appcompat/widget/C;->h:I

    const/4 v6, -0x2

    if-ne v5, v6, :cond_3

    iget-object v5, p0, Landroidx/appcompat/widget/C$b;->L:Landroid/widget/ListAdapter;

    check-cast v5, Landroid/widget/SpinnerAdapter;

    invoke-virtual {p0}, Landroidx/appcompat/widget/U;->f()Landroid/graphics/drawable/Drawable;

    move-result-object v6

    invoke-virtual {v4, v5, v6}, Landroidx/appcompat/widget/C;->a(Landroid/widget/SpinnerAdapter;Landroid/graphics/drawable/Drawable;)I

    move-result v4

    iget-object v5, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-virtual {v5}, Landroid/widget/Spinner;->getContext()Landroid/content/Context;

    move-result-object v5

    invoke-virtual {v5}, Landroid/content/Context;->getResources()Landroid/content/res/Resources;

    move-result-object v5

    invoke-virtual {v5}, Landroid/content/res/Resources;->getDisplayMetrics()Landroid/util/DisplayMetrics;

    move-result-object v5

    iget v5, v5, Landroid/util/DisplayMetrics;->widthPixels:I

    iget-object v6, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    iget-object v6, v6, Landroidx/appcompat/widget/C;->i:Landroid/graphics/Rect;

    iget v7, v6, Landroid/graphics/Rect;->left:I

    sub-int/2addr v5, v7

    iget v6, v6, Landroid/graphics/Rect;->right:I

    sub-int/2addr v5, v6

    if-le v4, v5, :cond_2

    move v4, v5

    :cond_2
    sub-int v5, v3, v0

    sub-int/2addr v5, v2

    invoke-static {v4, v5}, Ljava/lang/Math;->max(II)I

    move-result v4

    goto :goto_2

    :cond_3
    const/4 v4, -0x1

    if-ne v5, v4, :cond_4

    sub-int v4, v3, v0

    sub-int/2addr v4, v2

    :goto_2
    invoke-virtual {p0, v4}, Landroidx/appcompat/widget/U;->b(I)V

    goto :goto_3

    :cond_4
    invoke-virtual {p0, v5}, Landroidx/appcompat/widget/U;->b(I)V

    :goto_3
    iget-object v4, p0, Landroidx/appcompat/widget/C$b;->N:Landroidx/appcompat/widget/C;

    invoke-static {v4}, Landroidx/appcompat/widget/Ha;->a(Landroid/view/View;)Z

    move-result v4

    if-eqz v4, :cond_5

    sub-int/2addr v3, v2

    invoke-virtual {p0}, Landroidx/appcompat/widget/U;->i()I

    move-result v0

    sub-int/2addr v3, v0

    add-int/2addr v1, v3

    goto :goto_4

    :cond_5
    add-int/2addr v1, v0

    :goto_4
    invoke-virtual {p0, v1}, Landroidx/appcompat/widget/U;->d(I)V

    return-void
.end method

.method public m()Ljava/lang/CharSequence;
    .locals 1

    iget-object v0, p0, Landroidx/appcompat/widget/C$b;->K:Ljava/lang/CharSequence;

    return-object v0
.end method
