.class Lcom/google/android/material/bottomsheet/a;
.super La/i/b/c$a;
.source ""


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Lcom/google/android/material/bottomsheet/BottomSheetBehavior;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;


# direct methods
.method constructor <init>(Lcom/google/android/material/bottomsheet/BottomSheetBehavior;)V
    .locals 0

    iput-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-direct {p0}, La/i/b/c$a;-><init>()V

    return-void
.end method


# virtual methods
.method public a(Landroid/view/View;II)I
    .locals 0

    invoke-virtual {p1}, Landroid/view/View;->getLeft()I

    move-result p1

    return p1
.end method

.method public a(Landroid/view/View;FF)V
    .locals 7

    const/4 v0, 0x0

    cmpg-float v1, p3, v0

    const/4 v2, 0x0

    const/4 v3, 0x4

    const/4 v4, 0x6

    const/4 v5, 0x3

    if-gez v1, :cond_2

    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-static {p2}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->a(Lcom/google/android/material/bottomsheet/BottomSheetBehavior;)Z

    move-result p2

    if-eqz p2, :cond_0

    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget p2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->g:I

    :goto_0
    move v3, v5

    goto/16 :goto_4

    :cond_0
    invoke-virtual {p1}, Landroid/view/View;->getTop()I

    move-result p2

    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->h:I

    if-le p2, p3, :cond_1

    move p2, p3

    :goto_1
    move v3, v4

    goto/16 :goto_4

    :cond_1
    :goto_2
    move p2, v2

    goto :goto_0

    :cond_2
    iget-object v1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget-boolean v6, v1, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->j:Z

    if-eqz v6, :cond_4

    invoke-virtual {v1, p1, p3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->a(Landroid/view/View;F)Z

    move-result v1

    if-eqz v1, :cond_4

    invoke-virtual {p1}, Landroid/view/View;->getTop()I

    move-result v1

    iget-object v6, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v6, v6, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    if-gt v1, v6, :cond_3

    invoke-static {p2}, Ljava/lang/Math;->abs(F)F

    move-result v1

    invoke-static {p3}, Ljava/lang/Math;->abs(F)F

    move-result v6

    cmpg-float v1, v1, v6

    if-gez v1, :cond_4

    :cond_3
    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget p2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->q:I

    const/4 v3, 0x5

    goto/16 :goto_4

    :cond_4
    cmpl-float v0, p3, v0

    if-eqz v0, :cond_6

    invoke-static {p2}, Ljava/lang/Math;->abs(F)F

    move-result p2

    invoke-static {p3}, Ljava/lang/Math;->abs(F)F

    move-result p3

    cmpl-float p2, p2, p3

    if-lez p2, :cond_5

    goto :goto_3

    :cond_5
    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget p2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    goto :goto_4

    :cond_6
    :goto_3
    invoke-virtual {p1}, Landroid/view/View;->getTop()I

    move-result p2

    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-static {p3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->a(Lcom/google/android/material/bottomsheet/BottomSheetBehavior;)Z

    move-result p3

    if-eqz p3, :cond_8

    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->g:I

    sub-int p3, p2, p3

    invoke-static {p3}, Ljava/lang/Math;->abs(I)I

    move-result p3

    iget-object v0, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v0, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    sub-int/2addr p2, v0

    invoke-static {p2}, Ljava/lang/Math;->abs(I)I

    move-result p2

    if-ge p3, p2, :cond_7

    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->g:I

    goto :goto_2

    :cond_7
    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    move p2, v2

    goto :goto_4

    :cond_8
    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v0, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->h:I

    if-ge p2, v0, :cond_9

    iget p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    sub-int p3, p2, p3

    invoke-static {p3}, Ljava/lang/Math;->abs(I)I

    move-result p3

    if-ge p2, p3, :cond_a

    goto :goto_2

    :cond_9
    sub-int p3, p2, v0

    invoke-static {p3}, Ljava/lang/Math;->abs(I)I

    move-result p3

    iget-object v0, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v0, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    sub-int/2addr p2, v0

    invoke-static {p2}, Ljava/lang/Math;->abs(I)I

    move-result p2

    if-ge p3, p2, :cond_7

    :cond_a
    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->h:I

    move p2, v2

    goto/16 :goto_1

    :goto_4
    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget-object p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->m:La/i/b/c;

    invoke-virtual {p1}, Landroid/view/View;->getLeft()I

    move-result v0

    invoke-virtual {p3, v0, p2}, La/i/b/c;->c(II)Z

    move-result p2

    if-eqz p2, :cond_b

    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    const/4 p3, 0x2

    invoke-virtual {p2, p3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->c(I)V

    new-instance p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior$c;

    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-direct {p2, p3, p1, v3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior$c;-><init>(Lcom/google/android/material/bottomsheet/BottomSheetBehavior;Landroid/view/View;I)V

    invoke-static {p1, p2}, La/g/i/s;->a(Landroid/view/View;Ljava/lang/Runnable;)V

    goto :goto_5

    :cond_b
    iget-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-virtual {p1, v3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->c(I)V

    :goto_5
    return-void
.end method

.method public a(Landroid/view/View;IIII)V
    .locals 0

    iget-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-virtual {p1, p3}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->a(I)V

    return-void
.end method

.method public b(Landroid/view/View;)I
    .locals 1

    iget-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget-boolean v0, p1, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->j:Z

    if-eqz v0, :cond_0

    iget p1, p1, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->q:I

    return p1

    :cond_0
    iget p1, p1, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    return p1
.end method

.method public b(Landroid/view/View;II)I
    .locals 1

    iget-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-static {p1}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->b(Lcom/google/android/material/bottomsheet/BottomSheetBehavior;)I

    move-result p1

    iget-object p3, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget-boolean v0, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->j:Z

    if-eqz v0, :cond_0

    iget p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->q:I

    goto :goto_0

    :cond_0
    iget p3, p3, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->i:I

    :goto_0
    invoke-static {p2, p1, p3}, La/g/d/a;->a(III)I

    move-result p1

    return p1
.end method

.method public b(Landroid/view/View;I)Z
    .locals 5

    iget-object v0, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget v1, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->l:I

    const/4 v2, 0x1

    const/4 v3, 0x0

    if-ne v1, v2, :cond_0

    return v3

    :cond_0
    iget-boolean v4, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->x:Z

    if-eqz v4, :cond_1

    return v3

    :cond_1
    const/4 v4, 0x3

    if-ne v1, v4, :cond_2

    iget v1, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->v:I

    if-ne v1, p2, :cond_2

    iget-object p2, v0, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->s:Ljava/lang/ref/WeakReference;

    invoke-virtual {p2}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object p2

    check-cast p2, Landroid/view/View;

    if-eqz p2, :cond_2

    const/4 v0, -0x1

    invoke-virtual {p2, v0}, Landroid/view/View;->canScrollVertically(I)Z

    move-result p2

    if-eqz p2, :cond_2

    return v3

    :cond_2
    iget-object p2, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    iget-object p2, p2, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->r:Ljava/lang/ref/WeakReference;

    if-eqz p2, :cond_3

    invoke-virtual {p2}, Ljava/lang/ref/WeakReference;->get()Ljava/lang/Object;

    move-result-object p2

    if-ne p2, p1, :cond_3

    goto :goto_0

    :cond_3
    move v2, v3

    :goto_0
    return v2
.end method

.method public c(I)V
    .locals 1

    const/4 v0, 0x1

    if-ne p1, v0, :cond_0

    iget-object p1, p0, Lcom/google/android/material/bottomsheet/a;->a:Lcom/google/android/material/bottomsheet/BottomSheetBehavior;

    invoke-virtual {p1, v0}, Lcom/google/android/material/bottomsheet/BottomSheetBehavior;->c(I)V

    :cond_0
    return-void
.end method
