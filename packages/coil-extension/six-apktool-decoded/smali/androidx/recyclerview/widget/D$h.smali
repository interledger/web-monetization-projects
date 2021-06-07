.class public abstract Landroidx/recyclerview/widget/D$h;
.super Ljava/lang/Object;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x409
    name = "h"
.end annotation

.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/recyclerview/widget/D$h$b;,
        Landroidx/recyclerview/widget/D$h$a;
    }
.end annotation


# instance fields
.field a:Landroidx/recyclerview/widget/b;

.field b:Landroidx/recyclerview/widget/D;

.field private final c:Landroidx/recyclerview/widget/N$b;

.field private final d:Landroidx/recyclerview/widget/N$b;

.field e:Landroidx/recyclerview/widget/N;

.field f:Landroidx/recyclerview/widget/N;

.field g:Landroidx/recyclerview/widget/D$s;

.field h:Z

.field i:Z

.field j:Z

.field private k:Z

.field private l:Z

.field m:I

.field n:Z

.field private o:I

.field private p:I

.field private q:I

.field private r:I


# direct methods
.method public constructor <init>()V
    .locals 2

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    new-instance v0, Landroidx/recyclerview/widget/E;

    invoke-direct {v0, p0}, Landroidx/recyclerview/widget/E;-><init>(Landroidx/recyclerview/widget/D$h;)V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$h;->c:Landroidx/recyclerview/widget/N$b;

    new-instance v0, Landroidx/recyclerview/widget/F;

    invoke-direct {v0, p0}, Landroidx/recyclerview/widget/F;-><init>(Landroidx/recyclerview/widget/D$h;)V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$h;->d:Landroidx/recyclerview/widget/N$b;

    new-instance v0, Landroidx/recyclerview/widget/N;

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->c:Landroidx/recyclerview/widget/N$b;

    invoke-direct {v0, v1}, Landroidx/recyclerview/widget/N;-><init>(Landroidx/recyclerview/widget/N$b;)V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$h;->e:Landroidx/recyclerview/widget/N;

    new-instance v0, Landroidx/recyclerview/widget/N;

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->d:Landroidx/recyclerview/widget/N$b;

    invoke-direct {v0, v1}, Landroidx/recyclerview/widget/N;-><init>(Landroidx/recyclerview/widget/N$b;)V

    iput-object v0, p0, Landroidx/recyclerview/widget/D$h;->f:Landroidx/recyclerview/widget/N;

    const/4 v0, 0x0

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->h:Z

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->i:Z

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->j:Z

    const/4 v0, 0x1

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->k:Z

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->l:Z

    return-void
.end method

.method public static a(III)I
    .locals 2

    invoke-static {p0}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result v0

    invoke-static {p0}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result p0

    const/high16 v1, -0x80000000

    if-eq v0, v1, :cond_1

    const/high16 v1, 0x40000000    # 2.0f

    if-eq v0, v1, :cond_0

    invoke-static {p1, p2}, Ljava/lang/Math;->max(II)I

    move-result p0

    :cond_0
    return p0

    :cond_1
    invoke-static {p1, p2}, Ljava/lang/Math;->max(II)I

    move-result p1

    invoke-static {p0, p1}, Ljava/lang/Math;->min(II)I

    move-result p0

    return p0
.end method

.method public static a(IIIIZ)I
    .locals 4

    sub-int/2addr p0, p2

    const/4 p2, 0x0

    invoke-static {p2, p0}, Ljava/lang/Math;->max(II)I

    move-result p0

    const/4 v0, -0x2

    const/4 v1, -0x1

    const/high16 v2, -0x80000000

    const/high16 v3, 0x40000000    # 2.0f

    if-eqz p4, :cond_3

    if-ltz p3, :cond_0

    goto :goto_1

    :cond_0
    if-ne p3, v1, :cond_7

    if-eq p1, v2, :cond_2

    if-eqz p1, :cond_1

    if-eq p1, v3, :cond_2

    :cond_1
    move p1, p2

    move p3, p1

    goto :goto_0

    :cond_2
    move p3, p0

    :goto_0
    move p2, p1

    move p0, p3

    goto :goto_2

    :cond_3
    if-ltz p3, :cond_4

    :goto_1
    move p0, p3

    move p2, v3

    goto :goto_2

    :cond_4
    if-ne p3, v1, :cond_5

    move p2, p1

    goto :goto_2

    :cond_5
    if-ne p3, v0, :cond_7

    if-eq p1, v2, :cond_6

    if-ne p1, v3, :cond_8

    :cond_6
    move p2, v2

    goto :goto_2

    :cond_7
    move p0, p2

    :cond_8
    :goto_2
    invoke-static {p0, p2}, Landroid/view/View$MeasureSpec;->makeMeasureSpec(II)I

    move-result p0

    return p0
.end method

.method public static a(Landroid/content/Context;Landroid/util/AttributeSet;II)Landroidx/recyclerview/widget/D$h$b;
    .locals 2

    new-instance v0, Landroidx/recyclerview/widget/D$h$b;

    invoke-direct {v0}, Landroidx/recyclerview/widget/D$h$b;-><init>()V

    sget-object v1, La/m/b;->RecyclerView:[I

    invoke-virtual {p0, p1, v1, p2, p3}, Landroid/content/Context;->obtainStyledAttributes(Landroid/util/AttributeSet;[III)Landroid/content/res/TypedArray;

    move-result-object p0

    sget p1, La/m/b;->RecyclerView_android_orientation:I

    const/4 p2, 0x1

    invoke-virtual {p0, p1, p2}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result p1

    iput p1, v0, Landroidx/recyclerview/widget/D$h$b;->a:I

    sget p1, La/m/b;->RecyclerView_spanCount:I

    invoke-virtual {p0, p1, p2}, Landroid/content/res/TypedArray;->getInt(II)I

    move-result p1

    iput p1, v0, Landroidx/recyclerview/widget/D$h$b;->b:I

    sget p1, La/m/b;->RecyclerView_reverseLayout:I

    const/4 p2, 0x0

    invoke-virtual {p0, p1, p2}, Landroid/content/res/TypedArray;->getBoolean(IZ)Z

    move-result p1

    iput-boolean p1, v0, Landroidx/recyclerview/widget/D$h$b;->c:Z

    sget p1, La/m/b;->RecyclerView_stackFromEnd:I

    invoke-virtual {p0, p1, p2}, Landroid/content/res/TypedArray;->getBoolean(IZ)Z

    move-result p1

    iput-boolean p1, v0, Landroidx/recyclerview/widget/D$h$b;->d:Z

    invoke-virtual {p0}, Landroid/content/res/TypedArray;->recycle()V

    return-object v0
.end method

.method private a(ILandroid/view/View;)V
    .locals 0

    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {p2, p1}, Landroidx/recyclerview/widget/b;->a(I)V

    return-void
.end method

.method private a(Landroid/view/View;IZ)V
    .locals 4

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v0

    if-nez p3, :cond_1

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result p3

    if-eqz p3, :cond_0

    goto :goto_0

    :cond_0
    iget-object p3, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p3, p3, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {p3, v0}, Landroidx/recyclerview/widget/O;->g(Landroidx/recyclerview/widget/D$w;)V

    goto :goto_1

    :cond_1
    :goto_0
    iget-object p3, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p3, p3, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {p3, v0}, Landroidx/recyclerview/widget/O;->a(Landroidx/recyclerview/widget/D$w;)V

    :goto_1
    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p3

    check-cast p3, Landroidx/recyclerview/widget/D$i;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->z()Z

    move-result v1

    const/4 v2, 0x0

    if-nez v1, :cond_6

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v1

    if-eqz v1, :cond_2

    goto :goto_2

    :cond_2
    invoke-virtual {p1}, Landroid/view/View;->getParent()Landroid/view/ViewParent;

    move-result-object v1

    iget-object v3, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-ne v1, v3, :cond_5

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/b;->b(Landroid/view/View;)I

    move-result v1

    const/4 v3, -0x1

    if-ne p2, v3, :cond_3

    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {p2}, Landroidx/recyclerview/widget/b;->a()I

    move-result p2

    :cond_3
    if-eq v1, v3, :cond_4

    if-eq v1, p2, :cond_8

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->w:Landroidx/recyclerview/widget/D$h;

    invoke-virtual {p1, v1, p2}, Landroidx/recyclerview/widget/D$h;->a(II)V

    goto :goto_4

    :cond_4
    new-instance p2, Ljava/lang/IllegalStateException;

    new-instance p3, Ljava/lang/StringBuilder;

    invoke-direct {p3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v0, "Added View has RecyclerView as parent but view is not a real child. Unfiltered index:"

    invoke-virtual {p3, v0}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1}, Landroid/view/ViewGroup;->indexOfChild(Landroid/view/View;)I

    move-result p1

    invoke-virtual {p3, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->i()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {p3, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {p2, p1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw p2

    :cond_5
    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v1, p1, p2, v2}, Landroidx/recyclerview/widget/b;->a(Landroid/view/View;IZ)V

    const/4 p2, 0x1

    iput-boolean p2, p3, Landroidx/recyclerview/widget/D$i;->c:Z

    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->g:Landroidx/recyclerview/widget/D$s;

    if-eqz p2, :cond_8

    invoke-virtual {p2}, Landroidx/recyclerview/widget/D$s;->c()Z

    move-result p2

    if-eqz p2, :cond_8

    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->g:Landroidx/recyclerview/widget/D$s;

    invoke-virtual {p2, p1}, Landroidx/recyclerview/widget/D$s;->a(Landroid/view/View;)V

    goto :goto_4

    :cond_6
    :goto_2
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->q()Z

    move-result v1

    if-eqz v1, :cond_7

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->y()V

    goto :goto_3

    :cond_7
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->c()V

    :goto_3
    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v3

    invoke-virtual {v1, p1, p2, v3, v2}, Landroidx/recyclerview/widget/b;->a(Landroid/view/View;ILandroid/view/ViewGroup$LayoutParams;Z)V

    :cond_8
    :goto_4
    iget-boolean p1, p3, Landroidx/recyclerview/widget/D$i;->d:Z

    if-eqz p1, :cond_9

    iget-object p1, v0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {p1}, Landroid/view/View;->invalidate()V

    iput-boolean v2, p3, Landroidx/recyclerview/widget/D$i;->d:Z

    :cond_9
    return-void
.end method

.method private a(Landroidx/recyclerview/widget/D$o;ILandroid/view/View;)V
    .locals 2

    invoke-static {p3}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v1

    if-eqz v1, :cond_0

    return-void

    :cond_0
    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->n()Z

    move-result v1

    if-eqz v1, :cond_1

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v1

    if-nez v1, :cond_1

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$a;->b()Z

    move-result v1

    if-nez v1, :cond_1

    invoke-virtual {p0, p2}, Landroidx/recyclerview/widget/D$h;->g(I)V

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/D$o;->b(Landroidx/recyclerview/widget/D$w;)V

    goto :goto_0

    :cond_1
    invoke-virtual {p0, p2}, Landroidx/recyclerview/widget/D$h;->a(I)V

    invoke-virtual {p1, p3}, Landroidx/recyclerview/widget/D$o;->c(Landroid/view/View;)V

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {p1, v0}, Landroidx/recyclerview/widget/O;->d(Landroidx/recyclerview/widget/D$w;)V

    :goto_0
    return-void
.end method

.method private static b(III)Z
    .locals 3

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result v0

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result p1

    const/4 v1, 0x0

    if-lez p2, :cond_0

    if-eq p0, p2, :cond_0

    return v1

    :cond_0
    const/high16 p2, -0x80000000

    const/4 v2, 0x1

    if-eq v0, p2, :cond_4

    if-eqz v0, :cond_3

    const/high16 p2, 0x40000000    # 2.0f

    if-eq v0, p2, :cond_1

    return v1

    :cond_1
    if-ne p1, p0, :cond_2

    move v1, v2

    :cond_2
    return v1

    :cond_3
    return v2

    :cond_4
    if-lt p1, p0, :cond_5

    move v1, v2

    :cond_5
    return v1
.end method

.method private b(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/graphics/Rect;Z)[I
    .locals 7

    const/4 p1, 0x2

    new-array p1, p1, [I

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result p4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v0

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->q()I

    move-result v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result v2

    sub-int/2addr v1, v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v3

    sub-int/2addr v2, v3

    invoke-virtual {p2}, Landroid/view/View;->getLeft()I

    move-result v3

    iget v4, p3, Landroid/graphics/Rect;->left:I

    add-int/2addr v3, v4

    invoke-virtual {p2}, Landroid/view/View;->getScrollX()I

    move-result v4

    sub-int/2addr v3, v4

    invoke-virtual {p2}, Landroid/view/View;->getTop()I

    move-result v4

    iget v5, p3, Landroid/graphics/Rect;->top:I

    add-int/2addr v4, v5

    invoke-virtual {p2}, Landroid/view/View;->getScrollY()I

    move-result p2

    sub-int/2addr v4, p2

    invoke-virtual {p3}, Landroid/graphics/Rect;->width()I

    move-result p2

    add-int/2addr p2, v3

    invoke-virtual {p3}, Landroid/graphics/Rect;->height()I

    move-result p3

    add-int/2addr p3, v4

    sub-int/2addr v3, p4

    const/4 p4, 0x0

    invoke-static {p4, v3}, Ljava/lang/Math;->min(II)I

    move-result v5

    sub-int/2addr v4, v0

    invoke-static {p4, v4}, Ljava/lang/Math;->min(II)I

    move-result v0

    sub-int/2addr p2, v1

    invoke-static {p4, p2}, Ljava/lang/Math;->max(II)I

    move-result v1

    sub-int/2addr p3, v2

    invoke-static {p4, p3}, Ljava/lang/Math;->max(II)I

    move-result p3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->j()I

    move-result v2

    const/4 v6, 0x1

    if-ne v2, v6, :cond_1

    if-eqz v1, :cond_0

    goto :goto_1

    :cond_0
    invoke-static {v5, p2}, Ljava/lang/Math;->max(II)I

    move-result v1

    goto :goto_1

    :cond_1
    if-eqz v5, :cond_2

    goto :goto_0

    :cond_2
    invoke-static {v3, v1}, Ljava/lang/Math;->min(II)I

    move-result v5

    :goto_0
    move v1, v5

    :goto_1
    if-eqz v0, :cond_3

    goto :goto_2

    :cond_3
    invoke-static {v4, p3}, Ljava/lang/Math;->min(II)I

    move-result v0

    :goto_2
    aput v1, p1, p4

    aput v0, p1, v6

    return-object p1
.end method

.method private d(Landroidx/recyclerview/widget/D;II)Z
    .locals 6

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getFocusedChild()Landroid/view/View;

    move-result-object p1

    const/4 v0, 0x0

    if-nez p1, :cond_0

    return v0

    :cond_0
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->q()I

    move-result v3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result v4

    sub-int/2addr v3, v4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v5

    sub-int/2addr v4, v5

    iget-object v5, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v5, v5, Landroidx/recyclerview/widget/D;->s:Landroid/graphics/Rect;

    invoke-virtual {p0, p1, v5}, Landroidx/recyclerview/widget/D$h;->b(Landroid/view/View;Landroid/graphics/Rect;)V

    iget p1, v5, Landroid/graphics/Rect;->left:I

    sub-int/2addr p1, p2

    if-ge p1, v3, :cond_2

    iget p1, v5, Landroid/graphics/Rect;->right:I

    sub-int/2addr p1, p2

    if-le p1, v1, :cond_2

    iget p1, v5, Landroid/graphics/Rect;->top:I

    sub-int/2addr p1, p3

    if-ge p1, v4, :cond_2

    iget p1, v5, Landroid/graphics/Rect;->bottom:I

    sub-int/2addr p1, p3

    if-gt p1, v2, :cond_1

    goto :goto_0

    :cond_1
    const/4 p1, 0x1

    return p1

    :cond_2
    :goto_0
    return v0
.end method


# virtual methods
.method A()Z
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method B()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->g:Landroidx/recyclerview/widget/D$s;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$s;->d()V

    :cond_0
    return-void
.end method

.method public C()Z
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method public a(ILandroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    if-eqz p1, :cond_1

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->a()Z

    move-result p1

    if-eqz p1, :cond_1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result p2

    :cond_1
    :goto_0
    return p2
.end method

.method public a(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public a(Landroid/view/View;ILandroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)Landroid/view/View;
    .locals 0

    const/4 p1, 0x0

    return-object p1
.end method

.method public a(Landroid/content/Context;Landroid/util/AttributeSet;)Landroidx/recyclerview/widget/D$i;
    .locals 1

    new-instance v0, Landroidx/recyclerview/widget/D$i;

    invoke-direct {v0, p1, p2}, Landroidx/recyclerview/widget/D$i;-><init>(Landroid/content/Context;Landroid/util/AttributeSet;)V

    return-object v0
.end method

.method public a(Landroid/view/ViewGroup$LayoutParams;)Landroidx/recyclerview/widget/D$i;
    .locals 1

    instance-of v0, p1, Landroidx/recyclerview/widget/D$i;

    if-eqz v0, :cond_0

    new-instance v0, Landroidx/recyclerview/widget/D$i;

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    invoke-direct {v0, p1}, Landroidx/recyclerview/widget/D$i;-><init>(Landroidx/recyclerview/widget/D$i;)V

    return-object v0

    :cond_0
    instance-of v0, p1, Landroid/view/ViewGroup$MarginLayoutParams;

    if-eqz v0, :cond_1

    new-instance v0, Landroidx/recyclerview/widget/D$i;

    check-cast p1, Landroid/view/ViewGroup$MarginLayoutParams;

    invoke-direct {v0, p1}, Landroidx/recyclerview/widget/D$i;-><init>(Landroid/view/ViewGroup$MarginLayoutParams;)V

    return-object v0

    :cond_1
    new-instance v0, Landroidx/recyclerview/widget/D$i;

    invoke-direct {v0, p1}, Landroidx/recyclerview/widget/D$i;-><init>(Landroid/view/ViewGroup$LayoutParams;)V

    return-object v0
.end method

.method public a(I)V
    .locals 1

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v0

    invoke-direct {p0, p1, v0}, Landroidx/recyclerview/widget/D$h;->a(ILandroid/view/View;)V

    return-void
.end method

.method public a(II)V
    .locals 2

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->a(I)V

    invoke-virtual {p0, v0, p2}, Landroidx/recyclerview/widget/D$h;->c(Landroid/view/View;I)V

    return-void

    :cond_0
    new-instance p2, Ljava/lang/IllegalArgumentException;

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    const-string v1, "Cannot move a child from non-existing index:"

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-direct {p2, p1}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p2
.end method

.method public a(IILandroidx/recyclerview/widget/D$t;Landroidx/recyclerview/widget/D$h$a;)V
    .locals 0

    return-void
.end method

.method public a(ILandroidx/recyclerview/widget/D$h$a;)V
    .locals 0

    return-void
.end method

.method public a(ILandroidx/recyclerview/widget/D$o;)V
    .locals 1

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->g(I)V

    invoke-virtual {p2, v0}, Landroidx/recyclerview/widget/D$o;->b(Landroid/view/View;)V

    return-void
.end method

.method a(La/g/i/a/c;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p0, v1, v0, p1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;La/g/i/a/c;)V

    return-void
.end method

.method public a(Landroid/graphics/Rect;II)V
    .locals 2

    invoke-virtual {p1}, Landroid/graphics/Rect;->width()I

    move-result v0

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result v1

    add-int/2addr v0, v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result v1

    add-int/2addr v0, v1

    invoke-virtual {p1}, Landroid/graphics/Rect;->height()I

    move-result p1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v1

    add-int/2addr p1, v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v1

    add-int/2addr p1, v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->l()I

    move-result v1

    invoke-static {p2, v0, v1}, Landroidx/recyclerview/widget/D$h;->a(III)I

    move-result p2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->k()I

    move-result v0

    invoke-static {p3, p1, v0}, Landroidx/recyclerview/widget/D$h;->a(III)I

    move-result p1

    invoke-virtual {p0, p2, p1}, Landroidx/recyclerview/widget/D$h;->c(II)V

    return-void
.end method

.method public a(Landroid/os/Parcelable;)V
    .locals 0

    return-void
.end method

.method public a(Landroid/view/View;)V
    .locals 1

    const/4 v0, -0x1

    invoke-virtual {p0, p1, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;I)V

    return-void
.end method

.method public a(Landroid/view/View;I)V
    .locals 1

    const/4 v0, 0x1

    invoke-direct {p0, p1, p2, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;IZ)V

    return-void
.end method

.method public a(Landroid/view/View;II)V
    .locals 5

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v1, p1}, Landroidx/recyclerview/widget/D;->h(Landroid/view/View;)Landroid/graphics/Rect;

    move-result-object v1

    iget v2, v1, Landroid/graphics/Rect;->left:I

    iget v3, v1, Landroid/graphics/Rect;->right:I

    add-int/2addr v2, v3

    add-int/2addr p2, v2

    iget v2, v1, Landroid/graphics/Rect;->top:I

    iget v1, v1, Landroid/graphics/Rect;->bottom:I

    add-int/2addr v2, v1

    add-int/2addr p3, v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->q()I

    move-result v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->r()I

    move-result v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result v3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result v4

    add-int/2addr v3, v4

    iget v4, v0, Landroid/view/ViewGroup$MarginLayoutParams;->leftMargin:I

    add-int/2addr v3, v4

    iget v4, v0, Landroid/view/ViewGroup$MarginLayoutParams;->rightMargin:I

    add-int/2addr v3, v4

    add-int/2addr v3, p2

    iget p2, v0, Landroid/view/ViewGroup$MarginLayoutParams;->width:I

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->a()Z

    move-result v4

    invoke-static {v1, v2, v3, p2, v4}, Landroidx/recyclerview/widget/D$h;->a(IIIIZ)I

    move-result p2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result v1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->i()I

    move-result v2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result v3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result v4

    add-int/2addr v3, v4

    iget v4, v0, Landroid/view/ViewGroup$MarginLayoutParams;->topMargin:I

    add-int/2addr v3, v4

    iget v4, v0, Landroid/view/ViewGroup$MarginLayoutParams;->bottomMargin:I

    add-int/2addr v3, v4

    add-int/2addr v3, p3

    iget p3, v0, Landroid/view/ViewGroup$MarginLayoutParams;->height:I

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->b()Z

    move-result v4

    invoke-static {v1, v2, v3, p3, v4}, Landroidx/recyclerview/widget/D$h;->a(IIIIZ)I

    move-result p3

    invoke-virtual {p0, p1, p2, p3, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;IILandroidx/recyclerview/widget/D$i;)Z

    move-result v0

    if-eqz v0, :cond_0

    invoke-virtual {p1, p2, p3}, Landroid/view/View;->measure(II)V

    :cond_0
    return-void
.end method

.method public a(Landroid/view/View;IIII)V
    .locals 3

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v1, v0, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget v2, v1, Landroid/graphics/Rect;->left:I

    add-int/2addr p2, v2

    iget v2, v0, Landroid/view/ViewGroup$MarginLayoutParams;->leftMargin:I

    add-int/2addr p2, v2

    iget v2, v1, Landroid/graphics/Rect;->top:I

    add-int/2addr p3, v2

    iget v2, v0, Landroid/view/ViewGroup$MarginLayoutParams;->topMargin:I

    add-int/2addr p3, v2

    iget v2, v1, Landroid/graphics/Rect;->right:I

    sub-int/2addr p4, v2

    iget v2, v0, Landroid/view/ViewGroup$MarginLayoutParams;->rightMargin:I

    sub-int/2addr p4, v2

    iget v1, v1, Landroid/graphics/Rect;->bottom:I

    sub-int/2addr p5, v1

    iget v0, v0, Landroid/view/ViewGroup$MarginLayoutParams;->bottomMargin:I

    sub-int/2addr p5, v0

    invoke-virtual {p1, p2, p3, p4, p5}, Landroid/view/View;->layout(IIII)V

    return-void
.end method

.method public a(Landroid/view/View;ILandroidx/recyclerview/widget/D$i;)V
    .locals 2

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v1

    if-eqz v1, :cond_0

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {v1, v0}, Landroidx/recyclerview/widget/O;->a(Landroidx/recyclerview/widget/D$w;)V

    goto :goto_0

    :cond_0
    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v1, Landroidx/recyclerview/widget/D;->p:Landroidx/recyclerview/widget/O;

    invoke-virtual {v1, v0}, Landroidx/recyclerview/widget/O;->g(Landroidx/recyclerview/widget/D$w;)V

    :goto_0
    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v0

    invoke-virtual {v1, p1, p2, p3, v0}, Landroidx/recyclerview/widget/b;->a(Landroid/view/View;ILandroid/view/ViewGroup$LayoutParams;Z)V

    return-void
.end method

.method a(Landroid/view/View;La/g/i/a/c;)V
    .locals 2

    invoke-static {p1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v0

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v1

    if-nez v1, :cond_0

    iget-object v1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    iget-object v0, v0, Landroidx/recyclerview/widget/D$w;->b:Landroid/view/View;

    invoke-virtual {v1, v0}, Landroidx/recyclerview/widget/b;->c(Landroid/view/View;)Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p0, v1, v0, p1, p2}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/View;La/g/i/a/c;)V

    :cond_0
    return-void
.end method

.method public a(Landroid/view/View;Landroid/graphics/Rect;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-nez v0, :cond_0

    const/4 p1, 0x0

    invoke-virtual {p2, p1, p1, p1, p1}, Landroid/graphics/Rect;->set(IIII)V

    return-void

    :cond_0
    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->h(Landroid/view/View;)Landroid/graphics/Rect;

    move-result-object p1

    invoke-virtual {p2, p1}, Landroid/graphics/Rect;->set(Landroid/graphics/Rect;)V

    return-void
.end method

.method public a(Landroid/view/View;Landroidx/recyclerview/widget/D$o;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->o(Landroid/view/View;)V

    invoke-virtual {p2, p1}, Landroidx/recyclerview/widget/D$o;->b(Landroid/view/View;)V

    return-void
.end method

.method public a(Landroid/view/View;ZLandroid/graphics/Rect;)V
    .locals 5

    if-eqz p2, :cond_0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p2

    check-cast p2, Landroidx/recyclerview/widget/D$i;

    iget-object p2, p2, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget v0, p2, Landroid/graphics/Rect;->left:I

    neg-int v0, v0

    iget v1, p2, Landroid/graphics/Rect;->top:I

    neg-int v1, v1

    invoke-virtual {p1}, Landroid/view/View;->getWidth()I

    move-result v2

    iget v3, p2, Landroid/graphics/Rect;->right:I

    add-int/2addr v2, v3

    invoke-virtual {p1}, Landroid/view/View;->getHeight()I

    move-result v3

    iget p2, p2, Landroid/graphics/Rect;->bottom:I

    add-int/2addr v3, p2

    invoke-virtual {p3, v0, v1, v2, v3}, Landroid/graphics/Rect;->set(IIII)V

    goto :goto_0

    :cond_0
    invoke-virtual {p1}, Landroid/view/View;->getWidth()I

    move-result p2

    invoke-virtual {p1}, Landroid/view/View;->getHeight()I

    move-result v0

    const/4 v1, 0x0

    invoke-virtual {p3, v1, v1, p2, v0}, Landroid/graphics/Rect;->set(IIII)V

    :goto_0
    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz p2, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getMatrix()Landroid/graphics/Matrix;

    move-result-object p2

    if-eqz p2, :cond_1

    invoke-virtual {p2}, Landroid/graphics/Matrix;->isIdentity()Z

    move-result v0

    if-nez v0, :cond_1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->u:Landroid/graphics/RectF;

    invoke-virtual {v0, p3}, Landroid/graphics/RectF;->set(Landroid/graphics/Rect;)V

    invoke-virtual {p2, v0}, Landroid/graphics/Matrix;->mapRect(Landroid/graphics/RectF;)Z

    iget p2, v0, Landroid/graphics/RectF;->left:F

    float-to-double v1, p2

    invoke-static {v1, v2}, Ljava/lang/Math;->floor(D)D

    move-result-wide v1

    double-to-int p2, v1

    iget v1, v0, Landroid/graphics/RectF;->top:F

    float-to-double v1, v1

    invoke-static {v1, v2}, Ljava/lang/Math;->floor(D)D

    move-result-wide v1

    double-to-int v1, v1

    iget v2, v0, Landroid/graphics/RectF;->right:F

    float-to-double v2, v2

    invoke-static {v2, v3}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v2

    double-to-int v2, v2

    iget v0, v0, Landroid/graphics/RectF;->bottom:F

    float-to-double v3, v0

    invoke-static {v3, v4}, Ljava/lang/Math;->ceil(D)D

    move-result-wide v3

    double-to-int v0, v3

    invoke-virtual {p3, p2, v1, v2, v0}, Landroid/graphics/Rect;->set(IIII)V

    :cond_1
    invoke-virtual {p1}, Landroid/view/View;->getLeft()I

    move-result p2

    invoke-virtual {p1}, Landroid/view/View;->getTop()I

    move-result p1

    invoke-virtual {p3, p2, p1}, Landroid/graphics/Rect;->offset(II)V

    return-void
.end method

.method public a(Landroid/view/accessibility/AccessibilityEvent;)V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p0, v1, v0, p1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/accessibility/AccessibilityEvent;)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$a;Landroidx/recyclerview/widget/D$a;)V
    .locals 0

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$o;)V
    .locals 2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->e()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_0

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v1

    invoke-direct {p0, p1, v0, v1}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;ILandroid/view/View;)V

    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_0
    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;II)V
    .locals 0

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1, p3, p4}, Landroidx/recyclerview/widget/D;->c(II)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;La/g/i/a/c;)V
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 v1, -0x1

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result v0

    const/4 v2, 0x1

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, v1}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result v0

    if-eqz v0, :cond_1

    :cond_0
    const/16 v0, 0x2000

    invoke-virtual {p3, v0}, La/g/i/a/c;->a(I)V

    invoke-virtual {p3, v2}, La/g/i/a/c;->c(Z)V

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, v2}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result v0

    if-nez v0, :cond_2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, v2}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result v0

    if-eqz v0, :cond_3

    :cond_2
    const/16 v0, 0x1000

    invoke-virtual {p3, v0}, La/g/i/a/c;->a(I)V

    invoke-virtual {p3, v2}, La/g/i/a/c;->c(Z)V

    :cond_3
    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$h;->b(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I

    move-result v0

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I

    move-result v1

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$h;->d(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)Z

    move-result v2

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$h;->c(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I

    move-result p1

    invoke-static {v0, v1, v2, p1}, La/g/i/a/c$a;->a(IIZI)La/g/i/a/c$a;

    move-result-object p1

    invoke-virtual {p3, p1}, La/g/i/a/c;->a(Ljava/lang/Object;)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/View;La/g/i/a/c;)V
    .locals 6

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->b()Z

    move-result p1

    const/4 p2, 0x0

    if-eqz p1, :cond_0

    invoke-virtual {p0, p3}, Landroidx/recyclerview/widget/D$h;->l(Landroid/view/View;)I

    move-result p1

    move v0, p1

    goto :goto_0

    :cond_0
    move v0, p2

    :goto_0
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->a()Z

    move-result p1

    if-eqz p1, :cond_1

    invoke-virtual {p0, p3}, Landroidx/recyclerview/widget/D$h;->l(Landroid/view/View;)I

    move-result p2

    :cond_1
    move v2, p2

    const/4 v1, 0x1

    const/4 v3, 0x1

    const/4 v4, 0x0

    const/4 v5, 0x0

    invoke-static/range {v0 .. v5}, La/g/i/a/c$b;->a(IIIIZZ)La/g/i/a/c$b;

    move-result-object p1

    invoke-virtual {p4, p1}, La/g/i/a/c;->b(Ljava/lang/Object;)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/accessibility/AccessibilityEvent;)V
    .locals 1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz p1, :cond_3

    if-nez p3, :cond_0

    goto :goto_1

    :cond_0
    const/4 p2, 0x1

    invoke-virtual {p1, p2}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result p1

    if-nez p1, :cond_2

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 v0, -0x1

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result p1

    if-nez p1, :cond_2

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result p1

    if-nez p1, :cond_2

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1, p2}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result p1

    if-eqz p1, :cond_1

    goto :goto_0

    :cond_1
    const/4 p2, 0x0

    :cond_2
    :goto_0
    invoke-virtual {p3, p2}, Landroid/view/accessibility/AccessibilityEvent;->setScrollable(Z)V

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-eqz p1, :cond_3

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result p1

    invoke-virtual {p3, p1}, Landroid/view/accessibility/AccessibilityEvent;->setItemCount(I)V

    :cond_3
    :goto_1
    return-void
.end method

.method a(Landroidx/recyclerview/widget/D;)V
    .locals 1

    const/4 v0, 0x1

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->i:Z

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->b(Landroidx/recyclerview/widget/D;)V

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D;II)V
    .locals 0

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D;III)V
    .locals 0

    return-void
.end method

.method public a(Landroidx/recyclerview/widget/D;IILjava/lang/Object;)V
    .locals 0

    invoke-virtual {p0, p1, p2, p3}, Landroidx/recyclerview/widget/D$h;->c(Landroidx/recyclerview/widget/D;II)V

    return-void
.end method

.method a(Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$o;)V
    .locals 1

    const/4 v0, 0x0

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->i:Z

    invoke-virtual {p0, p1, p2}, Landroidx/recyclerview/widget/D$h;->b(Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$o;)V

    return-void
.end method

.method public a(Ljava/lang/String;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->a(Ljava/lang/String;)V

    :cond_0
    return-void
.end method

.method public a()Z
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method a(ILandroid/os/Bundle;)Z
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v1, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {p0, v1, v0, p1, p2}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;ILandroid/os/Bundle;)Z

    move-result p1

    return p1
.end method

.method a(Landroid/view/View;IILandroidx/recyclerview/widget/D$i;)Z
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->isLayoutRequested()Z

    move-result v0

    if-nez v0, :cond_1

    iget-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->k:Z

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getWidth()I

    move-result v0

    iget v1, p4, Landroid/view/ViewGroup$MarginLayoutParams;->width:I

    invoke-static {v0, p2, v1}, Landroidx/recyclerview/widget/D$h;->b(III)Z

    move-result p2

    if-eqz p2, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getHeight()I

    move-result p1

    iget p2, p4, Landroid/view/ViewGroup$MarginLayoutParams;->height:I

    invoke-static {p1, p3, p2}, Landroidx/recyclerview/widget/D$h;->b(III)Z

    move-result p1

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 p1, 0x1

    :goto_1
    return p1
.end method

.method a(Landroid/view/View;ILandroid/os/Bundle;)Z
    .locals 7

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v2, v0, Landroidx/recyclerview/widget/D;->l:Landroidx/recyclerview/widget/D$o;

    iget-object v3, v0, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    move-object v1, p0

    move-object v4, p1

    move v5, p2

    move-object v6, p3

    invoke-virtual/range {v1 .. v6}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/View;ILandroid/os/Bundle;)Z

    move-result p1

    return p1
.end method

.method public a(Landroid/view/View;ZZ)Z
    .locals 2

    iget-object p3, p0, Landroidx/recyclerview/widget/D$h;->e:Landroidx/recyclerview/widget/N;

    const/16 v0, 0x6003

    invoke-virtual {p3, p1, v0}, Landroidx/recyclerview/widget/N;->a(Landroid/view/View;I)Z

    move-result p3

    const/4 v1, 0x1

    if-eqz p3, :cond_0

    iget-object p3, p0, Landroidx/recyclerview/widget/D$h;->f:Landroidx/recyclerview/widget/N;

    invoke-virtual {p3, p1, v0}, Landroidx/recyclerview/widget/N;->a(Landroid/view/View;I)Z

    move-result p1

    if-eqz p1, :cond_0

    move p1, v1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    if-eqz p2, :cond_1

    return p1

    :cond_1
    xor-int/2addr p1, v1

    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D$i;)Z
    .locals 0

    if-eqz p1, :cond_0

    const/4 p1, 0x1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;ILandroid/os/Bundle;)Z
    .locals 1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x0

    if-nez p1, :cond_0

    return p2

    :cond_0
    const/16 p4, 0x1000

    const/4 v0, 0x1

    if-eq p3, p4, :cond_3

    const/16 p4, 0x2000

    if-eq p3, p4, :cond_1

    move p1, p2

    move p3, p1

    goto :goto_2

    :cond_1
    const/4 p3, -0x1

    invoke-virtual {p1, p3}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result p1

    if-eqz p1, :cond_2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result p1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result p4

    sub-int/2addr p1, p4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result p4

    sub-int/2addr p1, p4

    neg-int p1, p1

    goto :goto_0

    :cond_2
    move p1, p2

    :goto_0
    iget-object p4, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p4, p3}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result p3

    if-eqz p3, :cond_5

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->q()I

    move-result p3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result p4

    sub-int/2addr p3, p4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result p4

    sub-int/2addr p3, p4

    neg-int p3, p3

    goto :goto_2

    :cond_3
    invoke-virtual {p1, v0}, Landroid/view/ViewGroup;->canScrollVertically(I)Z

    move-result p1

    if-eqz p1, :cond_4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->h()I

    move-result p1

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->p()I

    move-result p3

    sub-int/2addr p1, p3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->m()I

    move-result p3

    sub-int/2addr p1, p3

    goto :goto_1

    :cond_4
    move p1, p2

    :goto_1
    iget-object p3, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p3, v0}, Landroid/view/ViewGroup;->canScrollHorizontally(I)Z

    move-result p3

    if-eqz p3, :cond_5

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->q()I

    move-result p3

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->n()I

    move-result p4

    sub-int/2addr p3, p4

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->o()I

    move-result p4

    sub-int/2addr p3, p4

    goto :goto_2

    :cond_5
    move p3, p2

    :goto_2
    if-nez p1, :cond_6

    if-nez p3, :cond_6

    return p2

    :cond_6
    iget-object p2, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p2, p3, p1}, Landroidx/recyclerview/widget/D;->i(II)V

    return v0
.end method

.method public a(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;Landroid/view/View;ILandroid/os/Bundle;)Z
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/graphics/Rect;Z)Z
    .locals 6

    const/4 v5, 0x0

    move-object v0, p0

    move-object v1, p1

    move-object v2, p2

    move-object v3, p3

    move v4, p4

    invoke-virtual/range {v0 .. v5}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/graphics/Rect;ZZ)Z

    move-result p1

    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/graphics/Rect;ZZ)Z
    .locals 2

    invoke-direct {p0, p1, p2, p3, p4}, Landroidx/recyclerview/widget/D$h;->b(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/graphics/Rect;Z)[I

    move-result-object p2

    const/4 p3, 0x0

    aget v0, p2, p3

    const/4 v1, 0x1

    aget p2, p2, v1

    if-eqz p5, :cond_0

    invoke-direct {p0, p1, v0, p2}, Landroidx/recyclerview/widget/D$h;->d(Landroidx/recyclerview/widget/D;II)Z

    move-result p5

    if-eqz p5, :cond_1

    :cond_0
    if-nez v0, :cond_2

    if-eqz p2, :cond_1

    goto :goto_0

    :cond_1
    return p3

    :cond_2
    :goto_0
    if-eqz p4, :cond_3

    invoke-virtual {p1, v0, p2}, Landroidx/recyclerview/widget/D;->scrollBy(II)V

    goto :goto_1

    :cond_3
    invoke-virtual {p1, v0, p2}, Landroidx/recyclerview/widget/D;->i(II)V

    :goto_1
    return v1
.end method

.method public a(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/view/View;)Z
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->w()Z

    move-result p2

    if-nez p2, :cond_1

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D;->n()Z

    move-result p1

    if-eqz p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 p1, 0x1

    :goto_1
    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$t;Landroid/view/View;Landroid/view/View;)Z
    .locals 0

    invoke-virtual {p0, p1, p3, p4}, Landroidx/recyclerview/widget/D$h;->a(Landroidx/recyclerview/widget/D;Landroid/view/View;Landroid/view/View;)Z

    move-result p1

    return p1
.end method

.method public a(Landroidx/recyclerview/widget/D;Ljava/util/ArrayList;II)Z
    .locals 0
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Landroidx/recyclerview/widget/D;",
            "Ljava/util/ArrayList<",
            "Landroid/view/View;",
            ">;II)Z"
        }
    .end annotation

    const/4 p1, 0x0

    return p1
.end method

.method public a(Ljava/lang/Runnable;)Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroid/view/ViewGroup;->removeCallbacks(Ljava/lang/Runnable;)Z

    move-result p1

    return p1

    :cond_0
    const/4 p1, 0x0

    return p1
.end method

.method public b(ILandroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public b(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 p2, 0x1

    if-eqz p1, :cond_1

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->b()Z

    move-result p1

    if-eqz p1, :cond_1

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object p1, p1, Landroidx/recyclerview/widget/D;->v:Landroidx/recyclerview/widget/D$a;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$a;->a()I

    move-result p2

    :cond_1
    :goto_0
    return p2
.end method

.method public b(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public b(I)Landroid/view/View;
    .locals 5

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->e()I

    move-result v0

    const/4 v1, 0x0

    :goto_0
    if-ge v1, v0, :cond_3

    invoke-virtual {p0, v1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v2

    invoke-static {v2}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v3

    if-nez v3, :cond_0

    goto :goto_1

    :cond_0
    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->i()I

    move-result v4

    if-ne v4, p1, :cond_2

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v4

    if-nez v4, :cond_2

    iget-object v4, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v4, v4, Landroidx/recyclerview/widget/D;->ra:Landroidx/recyclerview/widget/D$t;

    invoke-virtual {v4}, Landroidx/recyclerview/widget/D$t;->d()Z

    move-result v4

    if-nez v4, :cond_1

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->p()Z

    move-result v3

    if-nez v3, :cond_2

    :cond_1
    return-object v2

    :cond_2
    :goto_1
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_3
    const/4 p1, 0x0

    return-object p1
.end method

.method b(II)V
    .locals 1

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result v0

    iput v0, p0, Landroidx/recyclerview/widget/D$h;->q:I

    invoke-static {p1}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result p1

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->o:I

    iget p1, p0, Landroidx/recyclerview/widget/D$h;->o:I

    const/4 v0, 0x0

    if-nez p1, :cond_0

    sget-boolean p1, Landroidx/recyclerview/widget/D;->d:Z

    if-nez p1, :cond_0

    iput v0, p0, Landroidx/recyclerview/widget/D$h;->q:I

    :cond_0
    invoke-static {p2}, Landroid/view/View$MeasureSpec;->getSize(I)I

    move-result p1

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->r:I

    invoke-static {p2}, Landroid/view/View$MeasureSpec;->getMode(I)I

    move-result p1

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->p:I

    iget p1, p0, Landroidx/recyclerview/widget/D$h;->p:I

    if-nez p1, :cond_1

    sget-boolean p1, Landroidx/recyclerview/widget/D;->d:Z

    if-nez p1, :cond_1

    iput v0, p0, Landroidx/recyclerview/widget/D$h;->r:I

    :cond_1
    return-void
.end method

.method public b(Landroid/view/View;)V
    .locals 1

    const/4 v0, -0x1

    invoke-virtual {p0, p1, v0}, Landroidx/recyclerview/widget/D$h;->b(Landroid/view/View;I)V

    return-void
.end method

.method public b(Landroid/view/View;I)V
    .locals 1

    const/4 v0, 0x0

    invoke-direct {p0, p1, p2, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;IZ)V

    return-void
.end method

.method public b(Landroid/view/View;Landroid/graphics/Rect;)V
    .locals 0

    invoke-static {p1, p2}, Landroidx/recyclerview/widget/D;->a(Landroid/view/View;Landroid/graphics/Rect;)V

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D$o;)V
    .locals 2

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->e()I

    move-result v0

    add-int/lit8 v0, v0, -0x1

    :goto_0
    if-ltz v0, :cond_1

    invoke-virtual {p0, v0}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v1

    invoke-static {v1}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v1

    invoke-virtual {v1}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v1

    if-nez v1, :cond_0

    invoke-virtual {p0, v0, p1}, Landroidx/recyclerview/widget/D$h;->a(ILandroidx/recyclerview/widget/D$o;)V

    :cond_0
    add-int/lit8 v0, v0, -0x1

    goto :goto_0

    :cond_1
    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D;)V
    .locals 0

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D;II)V
    .locals 0

    return-void
.end method

.method public b(Landroidx/recyclerview/widget/D;Landroidx/recyclerview/widget/D$o;)V
    .locals 0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->c(Landroidx/recyclerview/widget/D;)V

    return-void
.end method

.method public b()Z
    .locals 1

    const/4 v0, 0x0

    return v0
.end method

.method b(Landroid/view/View;IILandroidx/recyclerview/widget/D$i;)Z
    .locals 2

    iget-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->k:Z

    if-eqz v0, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getMeasuredWidth()I

    move-result v0

    iget v1, p4, Landroid/view/ViewGroup$MarginLayoutParams;->width:I

    invoke-static {v0, p2, v1}, Landroidx/recyclerview/widget/D$h;->b(III)Z

    move-result p2

    if-eqz p2, :cond_1

    invoke-virtual {p1}, Landroid/view/View;->getMeasuredHeight()I

    move-result p1

    iget p2, p4, Landroid/view/ViewGroup$MarginLayoutParams;->height:I

    invoke-static {p1, p3, p2}, Landroidx/recyclerview/widget/D$h;->b(III)Z

    move-result p1

    if-nez p1, :cond_0

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    goto :goto_1

    :cond_1
    :goto_0
    const/4 p1, 0x1

    :goto_1
    return p1
.end method

.method public c(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public c(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public c(I)Landroid/view/View;
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/b;->c(I)Landroid/view/View;

    move-result-object p1

    goto :goto_0

    :cond_0
    const/4 p1, 0x0

    :goto_0
    return-object p1
.end method

.method public c(Landroid/view/View;)Landroid/view/View;
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    return-object v1

    :cond_0
    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->c(Landroid/view/View;)Landroid/view/View;

    move-result-object p1

    if-nez p1, :cond_1

    return-object v1

    :cond_1
    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/b;->c(Landroid/view/View;)Z

    move-result v0

    if-eqz v0, :cond_2

    return-object v1

    :cond_2
    return-object p1
.end method

.method public abstract c()Landroidx/recyclerview/widget/D$i;
.end method

.method public c(II)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-static {v0, p1, p2}, Landroidx/recyclerview/widget/D;->a(Landroidx/recyclerview/widget/D;II)V

    return-void
.end method

.method public c(Landroid/view/View;I)V
    .locals 1

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    invoke-virtual {p0, p1, p2, v0}, Landroidx/recyclerview/widget/D$h;->a(Landroid/view/View;ILandroidx/recyclerview/widget/D$i;)V

    return-void
.end method

.method c(Landroidx/recyclerview/widget/D$o;)V
    .locals 6

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$o;->e()I

    move-result v0

    add-int/lit8 v1, v0, -0x1

    :goto_0
    if-ltz v1, :cond_3

    invoke-virtual {p1, v1}, Landroidx/recyclerview/widget/D$o;->c(I)Landroid/view/View;

    move-result-object v2

    invoke-static {v2}, Landroidx/recyclerview/widget/D;->g(Landroid/view/View;)Landroidx/recyclerview/widget/D$w;

    move-result-object v3

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->x()Z

    move-result v4

    if-eqz v4, :cond_0

    goto :goto_1

    :cond_0
    const/4 v4, 0x0

    invoke-virtual {v3, v4}, Landroidx/recyclerview/widget/D$w;->a(Z)V

    invoke-virtual {v3}, Landroidx/recyclerview/widget/D$w;->r()Z

    move-result v5

    if-eqz v5, :cond_1

    iget-object v5, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v5, v2, v4}, Landroidx/recyclerview/widget/D;->removeDetachedView(Landroid/view/View;Z)V

    :cond_1
    iget-object v4, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v4, v4, Landroidx/recyclerview/widget/D;->W:Landroidx/recyclerview/widget/D$e;

    if-eqz v4, :cond_2

    invoke-virtual {v4, v3}, Landroidx/recyclerview/widget/D$e;->d(Landroidx/recyclerview/widget/D$w;)V

    :cond_2
    const/4 v4, 0x1

    invoke-virtual {v3, v4}, Landroidx/recyclerview/widget/D$w;->a(Z)V

    invoke-virtual {p1, v2}, Landroidx/recyclerview/widget/D$o;->a(Landroid/view/View;)V

    :goto_1
    add-int/lit8 v1, v1, -0x1

    goto :goto_0

    :cond_3
    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$o;->c()V

    if-lez v0, :cond_4

    iget-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->invalidate()V

    :cond_4
    return-void
.end method

.method public c(Landroidx/recyclerview/widget/D;)V
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    return-void
.end method

.method public c(Landroidx/recyclerview/widget/D;II)V
    .locals 0

    return-void
.end method

.method public d()I
    .locals 1

    const/4 v0, -0x1

    return v0
.end method

.method public d(Landroid/view/View;)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->bottom:I

    return p1
.end method

.method public d(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public d(Landroid/view/View;I)Landroid/view/View;
    .locals 0

    const/4 p1, 0x0

    return-object p1
.end method

.method public d(I)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->e(I)V

    :cond_0
    return-void
.end method

.method d(II)V
    .locals 8

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->e()I

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-virtual {v0, p1, p2}, Landroidx/recyclerview/widget/D;->c(II)V

    return-void

    :cond_0
    const/4 v1, 0x0

    const/high16 v2, -0x80000000

    const v3, 0x7fffffff

    move v4, v2

    move v5, v4

    move v2, v3

    :goto_0
    if-ge v1, v0, :cond_5

    invoke-virtual {p0, v1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v6

    iget-object v7, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v7, v7, Landroidx/recyclerview/widget/D;->s:Landroid/graphics/Rect;

    invoke-virtual {p0, v6, v7}, Landroidx/recyclerview/widget/D$h;->b(Landroid/view/View;Landroid/graphics/Rect;)V

    iget v6, v7, Landroid/graphics/Rect;->left:I

    if-ge v6, v3, :cond_1

    move v3, v6

    :cond_1
    iget v6, v7, Landroid/graphics/Rect;->right:I

    if-le v6, v4, :cond_2

    move v4, v6

    :cond_2
    iget v6, v7, Landroid/graphics/Rect;->top:I

    if-ge v6, v2, :cond_3

    move v2, v6

    :cond_3
    iget v6, v7, Landroid/graphics/Rect;->bottom:I

    if-le v6, v5, :cond_4

    move v5, v6

    :cond_4
    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_5
    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->s:Landroid/graphics/Rect;

    invoke-virtual {v0, v3, v2, v4, v5}, Landroid/graphics/Rect;->set(IIII)V

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->s:Landroid/graphics/Rect;

    invoke-virtual {p0, v0, p1, p2}, Landroidx/recyclerview/widget/D$h;->a(Landroid/graphics/Rect;II)V

    return-void
.end method

.method public d(Landroidx/recyclerview/widget/D;)V
    .locals 0

    return-void
.end method

.method public d(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)Z
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public e()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/b;->a()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public e(Landroid/view/View;)I
    .locals 1

    invoke-virtual {p1}, Landroid/view/View;->getBottom()I

    move-result v0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->d(Landroid/view/View;)I

    move-result p1

    add-int/2addr v0, p1

    return v0
.end method

.method public e(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public e(I)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/D;->f(I)V

    :cond_0
    return-void
.end method

.method public e(Landroidx/recyclerview/widget/D$o;Landroidx/recyclerview/widget/D$t;)V
    .locals 0

    const-string p1, "RecyclerView"

    const-string p2, "You must override onLayoutChildren(Recycler recycler, State state) "

    invoke-static {p1, p2}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    return-void
.end method

.method e(Landroidx/recyclerview/widget/D;)V
    .locals 2

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getWidth()I

    move-result v0

    const/high16 v1, 0x40000000    # 2.0f

    invoke-static {v0, v1}, Landroid/view/View$MeasureSpec;->makeMeasureSpec(II)I

    move-result v0

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getHeight()I

    move-result p1

    invoke-static {p1, v1}, Landroid/view/View$MeasureSpec;->makeMeasureSpec(II)I

    move-result p1

    invoke-virtual {p0, v0, p1}, Landroidx/recyclerview/widget/D$h;->b(II)V

    return-void
.end method

.method public f(Landroid/view/View;)I
    .locals 1

    invoke-virtual {p1}, Landroid/view/View;->getLeft()I

    move-result v0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->k(Landroid/view/View;)I

    move-result p1

    sub-int/2addr v0, p1

    return v0
.end method

.method public f(Landroidx/recyclerview/widget/D$t;)I
    .locals 0

    const/4 p1, 0x0

    return p1
.end method

.method public f(I)V
    .locals 0

    return-void
.end method

.method f(Landroidx/recyclerview/widget/D;)V
    .locals 1

    if-nez p1, :cond_0

    const/4 p1, 0x0

    iput-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iput-object p1, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    const/4 p1, 0x0

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->q:I

    goto :goto_0

    :cond_0
    iput-object p1, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    iget-object v0, p1, Landroidx/recyclerview/widget/D;->o:Landroidx/recyclerview/widget/b;

    iput-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getWidth()I

    move-result v0

    iput v0, p0, Landroidx/recyclerview/widget/D$h;->q:I

    invoke-virtual {p1}, Landroid/view/ViewGroup;->getHeight()I

    move-result p1

    :goto_0
    iput p1, p0, Landroidx/recyclerview/widget/D$h;->r:I

    const/high16 p1, 0x40000000    # 2.0f

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->o:I

    iput p1, p0, Landroidx/recyclerview/widget/D$h;->p:I

    return-void
.end method

.method public f()Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    iget-boolean v0, v0, Landroidx/recyclerview/widget/D;->q:Z

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public g(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v0, v0, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    invoke-virtual {p1}, Landroid/view/View;->getMeasuredHeight()I

    move-result p1

    iget v1, v0, Landroid/graphics/Rect;->top:I

    add-int/2addr p1, v1

    iget v0, v0, Landroid/graphics/Rect;->bottom:I

    add-int/2addr p1, v0

    return p1
.end method

.method public g()Landroid/view/View;
    .locals 3

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x0

    if-nez v0, :cond_0

    return-object v1

    :cond_0
    invoke-virtual {v0}, Landroid/view/ViewGroup;->getFocusedChild()Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_2

    iget-object v2, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v2, v0}, Landroidx/recyclerview/widget/b;->c(Landroid/view/View;)Z

    move-result v2

    if-eqz v2, :cond_1

    goto :goto_0

    :cond_1
    return-object v0

    :cond_2
    :goto_0
    return-object v1
.end method

.method public g(I)V
    .locals 1

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v0

    if-eqz v0, :cond_0

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/b;->e(I)V

    :cond_0
    return-void
.end method

.method public g(Landroidx/recyclerview/widget/D$t;)V
    .locals 0

    return-void
.end method

.method public h()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$h;->r:I

    return v0
.end method

.method public h(Landroid/view/View;)I
    .locals 2

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v0

    check-cast v0, Landroidx/recyclerview/widget/D$i;

    iget-object v0, v0, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    invoke-virtual {p1}, Landroid/view/View;->getMeasuredWidth()I

    move-result p1

    iget v1, v0, Landroid/graphics/Rect;->left:I

    add-int/2addr p1, v1

    iget v0, v0, Landroid/graphics/Rect;->right:I

    add-int/2addr p1, v0

    return p1
.end method

.method public i()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$h;->p:I

    return v0
.end method

.method public i(Landroid/view/View;)I
    .locals 1

    invoke-virtual {p1}, Landroid/view/View;->getRight()I

    move-result v0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->m(Landroid/view/View;)I

    move-result p1

    add-int/2addr v0, p1

    return v0
.end method

.method public j()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-static {v0}, La/g/i/s;->j(Landroid/view/View;)I

    move-result v0

    return v0
.end method

.method public j(Landroid/view/View;)I
    .locals 1

    invoke-virtual {p1}, Landroid/view/View;->getTop()I

    move-result v0

    invoke-virtual {p0, p1}, Landroidx/recyclerview/widget/D$h;->n(Landroid/view/View;)I

    move-result p1

    sub-int/2addr v0, p1

    return v0
.end method

.method public k()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-static {v0}, La/g/i/s;->k(Landroid/view/View;)I

    move-result v0

    return v0
.end method

.method public k(Landroid/view/View;)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->left:I

    return p1
.end method

.method public l()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    invoke-static {v0}, La/g/i/s;->l(Landroid/view/View;)I

    move-result v0

    return v0
.end method

.method public l(Landroid/view/View;)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    invoke-virtual {p1}, Landroidx/recyclerview/widget/D$i;->a()I

    move-result p1

    return p1
.end method

.method public m()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/ViewGroup;->getPaddingBottom()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public m(Landroid/view/View;)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->right:I

    return p1
.end method

.method public n()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/ViewGroup;->getPaddingLeft()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public n(Landroid/view/View;)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object p1

    check-cast p1, Landroidx/recyclerview/widget/D$i;

    iget-object p1, p1, Landroidx/recyclerview/widget/D$i;->b:Landroid/graphics/Rect;

    iget p1, p1, Landroid/graphics/Rect;->top:I

    return p1
.end method

.method public o()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/ViewGroup;->getPaddingRight()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public o(Landroid/view/View;)V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->a:Landroidx/recyclerview/widget/b;

    invoke-virtual {v0, p1}, Landroidx/recyclerview/widget/b;->d(Landroid/view/View;)V

    return-void
.end method

.method public p()I
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroid/view/ViewGroup;->getPaddingTop()I

    move-result v0

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public q()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$h;->q:I

    return v0
.end method

.method public r()I
    .locals 1

    iget v0, p0, Landroidx/recyclerview/widget/D$h;->o:I

    return v0
.end method

.method s()Z
    .locals 5

    invoke-virtual {p0}, Landroidx/recyclerview/widget/D$h;->e()I

    move-result v0

    const/4 v1, 0x0

    move v2, v1

    :goto_0
    if-ge v2, v0, :cond_1

    invoke-virtual {p0, v2}, Landroidx/recyclerview/widget/D$h;->c(I)Landroid/view/View;

    move-result-object v3

    invoke-virtual {v3}, Landroid/view/View;->getLayoutParams()Landroid/view/ViewGroup$LayoutParams;

    move-result-object v3

    iget v4, v3, Landroid/view/ViewGroup$LayoutParams;->width:I

    if-gez v4, :cond_0

    iget v3, v3, Landroid/view/ViewGroup$LayoutParams;->height:I

    if-gez v3, :cond_0

    const/4 v0, 0x1

    return v0

    :cond_0
    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_1
    return v1
.end method

.method public t()Z
    .locals 1

    iget-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->i:Z

    return v0
.end method

.method public u()Z
    .locals 1

    iget-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->j:Z

    return v0
.end method

.method public final v()Z
    .locals 1

    iget-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->l:Z

    return v0
.end method

.method public w()Z
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->g:Landroidx/recyclerview/widget/D$s;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$s;->c()Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 v0, 0x1

    goto :goto_0

    :cond_0
    const/4 v0, 0x0

    :goto_0
    return v0
.end method

.method public x()Landroid/os/Parcelable;
    .locals 1

    const/4 v0, 0x0

    return-object v0
.end method

.method public y()V
    .locals 1

    iget-object v0, p0, Landroidx/recyclerview/widget/D$h;->b:Landroidx/recyclerview/widget/D;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D;->requestLayout()V

    :cond_0
    return-void
.end method

.method public z()V
    .locals 1

    const/4 v0, 0x1

    iput-boolean v0, p0, Landroidx/recyclerview/widget/D$h;->h:Z

    return-void
.end method
